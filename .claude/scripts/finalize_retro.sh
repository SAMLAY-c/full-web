#!/bin/bash

LOG_DIR=".claude-logs"
LOG_FILE="$LOG_DIR/session.jsonl"
RETRO_FILE="$LOG_DIR/RETRO.md"

echo "" >> "$RETRO_FILE"
echo "## 🧠 Session $(date '+%Y-%m-%d %H:%M')" >> "$RETRO_FILE"

echo "" >> "$RETRO_FILE"
echo "### 🔹 我提出的问题" >> "$RETRO_FILE"
jq -r 'select(.event=="user_prompt") | "- " + .content' "$LOG_FILE" >> "$RETRO_FILE"

echo "" >> "$RETRO_FILE"
echo "### ⚠️ 遇到的问题" >> "$RETRO_FILE"
jq -r 'select(.event=="tool_failure") | "- [" + .tool + "] " + .error' "$LOG_FILE" >> "$RETRO_FILE"

# 简单判断是否"解决"
FAIL_COUNT=$(jq 'select(.event=="tool_failure")' "$LOG_FILE" | wc -l | xargs)

echo "" >> "$RETRO_FILE"
if [ "$FAIL_COUNT" -eq 0 ]; then
  echo "### ✅ 结果" >> "$RETRO_FILE"
  echo "问题已解决。" >> "$RETRO_FILE"
else
  echo "### ❌ 结果" >> "$RETRO_FILE"
  echo "本次会话仍存在 $FAIL_COUNT 个未解决问题。" >> "$RETRO_FILE"
fi

# 清空 session 日志（为下一次会话准备）
> "$LOG_FILE"

echo "" >> "$RETRO_FILE"
echo "---" >> "$RETRO_FILE"
