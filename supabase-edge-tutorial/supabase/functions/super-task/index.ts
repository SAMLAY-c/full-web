// Edge Function: super-task
// This function acts as a proxy for Google Gemini API
// It manages multiple API keys with automatic rotation and error handling

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// --- Configuration: These values are read from Supabase Secrets ---
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const MY_SECRET_TOKEN = Deno.env.get('MY_SECRET_TOKEN') || 'sk-123456'

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Main request handler
Deno.serve(async (req) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Validate authentication token
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (token !== MY_SECRET_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const requestData = await req.json()

    // 2. Connect to Supabase database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 3. Fetch an available API key
    // Prioritize keys that haven't been used recently (round-robin)
    const { data: keys, error: dbError } = await supabase
      .from('api_keys')
      .select('*')
      .eq('is_active', true)
      .eq('provider', 'gemini')
      .order('last_used_at', { ascending: true, nullsFirst: true })
      .limit(1)

    if (dbError || !keys || keys.length === 0) {
      console.error('DB Error or No Keys:', dbError)
      throw new Error('No available API keys in database. Please check api_keys table.')
    }

    const currentKey = keys[0]
    console.log(`✅ Using Key ID: ${currentKey.id}`)

    // 4. Forward request to Google Gemini API
    const upstreamUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'

    // Transform OpenAI format to Gemini format
    const geminiRequestBody = {
      contents: requestData.messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.content }],
      })),
    }

    // Send request to Gemini
    const response = await fetch(`${upstreamUrl}?key=${currentKey.api_key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiRequestBody)
    })

    // 5. Handle errors and auto-disable failed keys
    if (!response.ok) {
      const errorText = await response.text()
      
      // Disable key on rate limit (429) or invalid key (400)
      if (response.status === 429 || response.status === 400) {
        await supabase
          .from('api_keys')
          .update({ 
            is_active: false,
            error_log: `Status: ${response.status} - ${errorText.substring(0, 500)}`
          })
          .eq('id', currentKey.id)
      }
      
      return new Response(errorText, { 
        status: response.status, 
        headers: corsHeaders 
      })
    }

    // 6. Update usage statistics (async, don't wait)
    supabase
      .from('api_keys')
      .update({
        usage_count: (currentKey.usage_count || 0) + 1,
        last_used_at: new Date().toISOString(),
        error_log: null
      })
      .eq('id', currentKey.id)
      .then()

    // 7. Transform Gemini response to OpenAI format
    const googleResponse = await response.json()
    const openAIResponse = {
      id: "chatcmpl-" + crypto.randomUUID(),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: requestData.model,
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: googleResponse.candidates[0].content.parts[0].text,
        },
        finish_reason: "stop",
      }],
    }

    return new Response(JSON.stringify(openAIResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
