#!/bin/bash

LOG_DIR=".claude-logs"
LOG_FILE="$LOG_DIR/session.jsonl"

mkdir -p "$LOG_DIR"

jq -n \
  --arg ts "$(date -Iseconds)" \
  --arg event "tool_failure" \
  --arg tool "$CLAUDE_TOOL_NAME" \
  --arg error "$CLAUDE_TOOL_ERROR" \
  '{
    ts: $ts,
    event: $event,
    tool: $tool,
    error: $error
  }' >> "$LOG_FILE"
