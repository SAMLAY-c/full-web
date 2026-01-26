#!/bin/bash
# Claude Code PostToolUse Hook
# 每次工具调用后执行

set -euo pipefail

# 加载共享函数
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

# 接收参数 (Claude 通过 stdin 传递 JSON)
INPUT=$(cat)

# 解析输入 - 从 Claude 的事件结构中提取信息
TOOL_NAME=$(echo "$INPUT" | jq -r '.. | .tool? // empty | .name? // empty' 2>/dev/null | head -1)
DESCRIPTION=$(echo "$INPUT" | jq -r '.. | .tool? // empty | .description? // empty' 2>/dev/null | head -1)

# 如果提取不到，尝试其他可能的字段
if [ -z "$TOOL_NAME" ]; then
    TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName // .tool // "unknown"' 2>/dev/null || echo "unknown")
fi

if [ -z "$DESCRIPTION" ]; then
    DESCRIPTION=$(echo "$INPUT" | jq -r '.description // .desc // "No description"' 2>/dev/null || echo "No description")
fi

# 构建日志条目
LOG_ENTRY=$(jq -n \
    --arg type "tool_use" \
    --arg tool "$TOOL_NAME" \
    --arg desc "$DESCRIPTION" \
    '{type: $type, tool: $tool, description: $desc}')

# 写入日志
ensure_log_dir
write_log_entry "$LOG_ENTRY"

# 更新 Markdown (仅记录重要工具)
if [[ "$TOOL_NAME" =~ ^(Bash|Edit|Write|Read)$ ]]; then
    update_changelog "Tool: $TOOL_NAME" "**工具**: $TOOL_NAME\n**描述**: $DESCRIPTION"
fi

exit 0
