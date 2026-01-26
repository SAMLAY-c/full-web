#!/bin/bash
# AI 工作日志共享函数库
# 提供时间戳、Git 信息、日志写入等通用功能

# 项目根目录
PROJECT_ROOT="/Users/rye/Desktop/samlay-c/full-web"

# 日志文件路径
WORKLOG_JSONL="${PROJECT_ROOT}/.ai/worklog.jsonl"
CHANGELOG_MD="${PROJECT_ROOT}/CHANGELOG.ai.md"

# 获取当前时间戳 (ISO 8601, macOS 兼容)
get_timestamp() {
    date -u +"%Y-%m-%dT%H:%M:%SZ"
}

# 获取 git 信息
get_git_info() {
    cd "$PROJECT_ROOT" || exit 1
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "no-git")
    local commit=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    local remote=$(git config --get remote.origin.url 2>/dev/null || echo "")
    local user=$(git config user.name 2>/dev/null || echo "unknown")
    local email=$(git config user.email 2>/dev/null || echo "")

    echo "{\"branch\":\"$branch\",\"commit\":\"$commit\",\"remote\":\"$remote\",\"user\":\"$user\",\"email\":\"$email\"}"
}

# 写入 JSONL 日志
write_log_entry() {
    local entry="$1"
    local timestamp=$(get_timestamp)
    local git_info=$(get_git_info)

    # 构建 JSON 对象
    local json=$(jq -n \
        --arg ts "$timestamp" \
        --argjson git "$git_info" \
        --argjson data "$entry" \
        '{timestamp: $ts, git: $git, data: $data}')

    echo "$json" >> "$WORKLOG_JSONL"
}

# 更新 Markdown 日志
update_changelog() {
    local entry_type="$1"
    local message="$2"
    local timestamp=$(get_timestamp)

    # 追加到 Markdown
    cat >> "$CHANGELOG_MD" << EOF
## [$entry_type] $timestamp

$message

---
EOF
}

# 确保 .ai 目录存在
ensure_log_dir() {
    mkdir -p "${PROJECT_ROOT}/.ai"
    touch "$WORKLOG_JSONL"
    if [ ! -f "$CHANGELOG_MD" ]; then
        echo "# AI Work Log\n\n自动生成的 AI 工作日志\n\n---\n" > "$CHANGELOG_MD"
    fi
}
