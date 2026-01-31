#!/bin/bash

# 重新导入markdown文章到Sanity

echo "📚 准备重新导入文章到Sanity..."
echo ""

# 获取所有markdown文件
files=("2025-01-28-next-js-best-practices.md" "ai-pm-interview-questions-2026.md" "welcome-to-markdown.md")

# 构建JSON
file_list=$(printf '%s\n' "${files[@]}" | jq -R . | jq -s .)

# 调用导入API
echo "正在导入: ${files[*]}"
echo ""

curl -X POST http://localhost:3002/api/admin/import-markdown \
  -H "Content-Type: application/json" \
  -d "{\"files\": $file_list}" \
  | jq '.'

echo ""
echo "✅ 导入完成！"
echo "💡 访问 http://localhost:3002 查看博客列表"
