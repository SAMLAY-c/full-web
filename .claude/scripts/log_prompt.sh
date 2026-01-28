#!/bin/bash

LOG_DIR=".claude-logs"
LOG_FILE="$LOG_DIR/session.jsonl"

mkdir -p "$LOG_DIR"

jq -n \
  --arg ts "$(date -Iseconds)" \
  --arg event "user_prompt" \
  --arg content "$CLAUDE_USER_PROMPT" \
  '{
    ts: $ts,
    event: $event,
    content: $content
  }' >> "$LOG_FILE"
