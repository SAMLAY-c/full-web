import "server-only";

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  SANITY_READ_TOKEN: z.string().optional(),
  SANITY_WRITE_TOKEN: z.string().optional(),
  // AI Configuration
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  SILICONFLOW_API_KEY: z.string().optional(),
  AI_DEFAULT_PROVIDER: z.string().default("siliconflow"),
  AI_DEFAULT_MODEL: z.string().default("deepseek-ai/DeepSeek-V3.2"),
  AI_BASE_URL: z.string().default("https://api.siliconflow.cn/v1")
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
  SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  SILICONFLOW_API_KEY: process.env.SILICONFLOW_API_KEY,
  AI_DEFAULT_PROVIDER: process.env.AI_DEFAULT_PROVIDER,
  AI_DEFAULT_MODEL: process.env.AI_DEFAULT_MODEL,
  AI_BASE_URL: process.env.AI_BASE_URL
});
