#!/bin/bash
# Claude Code Stop Hook
# 对话结束时执行

set -euo pipefail

# 加载共享函数
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

# 接收参数
INPUT=$(cat)

# 尝试解析会话信息
# 注意：Claude Stop 事件的格式可能不固定，这里做保守处理
SESSION_INFO=$(echo "$INPUT" | jq -c '.' 2>/dev/null || echo '{}')

# 构建日志条目
LOG_ENTRY=$(jq -n \
    --arg type "session_end" \
    --argjson raw "$SESSION_INFO" \
    '{type: $type, rawEvent: $raw}')

# 写入日志
ensure_log_dir
write_log_entry "$LOG_ENTRY"

# 更新 Markdown
update_changelog "Session Ended" "**时间**: $(date)\n**会话结束** - AI 工作日志系统已记录"

exit 0
