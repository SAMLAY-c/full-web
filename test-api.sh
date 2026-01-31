#!/bin/bash

# API 测试脚本
# 测试所有文章相关的 API 接口

BASE_URL="http://localhost:3000"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "=========================================="
echo "文章 API 完整测试套件"
echo "=========================================="
echo ""

# 测试计数器
total_tests=0
passed_tests=0
failed_tests=0

# 测试函数
test_api() {
  local name="$1"
  local method="$2"
  local url="$3"
  local data="$4"
  local expected_code="${5:-200}"

  total_tests=$((total_tests + 1))

  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${YELLOW}测试 $total_tests: $name${NC}"
  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo "请求: $method $url"

  if [ -n "$data" ]; then
    echo "数据: $data"
    response=$(curl -s -X "$method" \
      -H "Content-Type: application/json" \
      -w "\n%{http_code}" \
      -d "$data" \
      "$BASE_URL$url")
  else
    response=$(curl -s -X "$method" \
      -w "\n%{http_code}" \
      "$BASE_URL$url")
  fi

  # 分离响应体和状态码
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  echo "响应:"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
  echo "状态码: $http_code"

  # 检查状态码
  if [ "$http_code" -eq "$expected_code" ]; then
    echo -e "${GREEN}✓ 通过 (状态码: $http_code)${NC}"
    passed_tests=$((passed_tests + 1))
  else
    echo -e "${RED}✗ 失败 (期望: $expected_code, 实际: $http_code)${NC}"
    failed_tests=$((failed_tests + 1))
  fi

  echo ""
}

# ========================================
# 第一组：创建文章
# ========================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   第一组：创建文章                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

test_api \
  "创建已发布文章（带标签）" \
  "POST" \
  "/api/publish" \
  '{
    "title": "测试文章 - 标签功能",
    "slug": "test-tags-featured",
    "postType": "article",
    "excerpt": "测试标签和发布时间功能",
    "status": "published",
    "tags": ["测试", "标签", "API"],
    "publishedAt": "2026-01-31T10:00:00Z"
  }' \
  200

test_api \
  "创建草稿文章" \
  "POST" \
  "/api/draft" \
  '{
    "title": "草稿文章测试",
    "slug": "draft-test",
    "postType": "article",
    "excerpt": "这是一篇草稿",
    "tags": ["草稿", "测试"],
    "publishedAt": "2026-01-31T11:00:00Z"
  }' \
  200

test_api \
  "使用 RESTful API 创建文章" \
  "POST" \
  "/api/posts" \
  '{
    "title": "RESTful API 测试",
    "slug": "restful-api-test",
    "postType": "article",
    "excerpt": "测试 RESTful API",
    "status": "published",
    "tags": ["RESTful", "API", "测试"],
    "publishedAt": "2026-01-31T12:00:00Z"
  }' \
  200

# ========================================
# 第二组：读取文章
# ========================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   第二组：读取文章                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

test_api \
  "获取所有文章列表" \
  "GET" \
  "/api/posts" \
  "" \
  200

test_api \
  "获取已发布文章" \
  "GET" \
  "/api/posts?status=published" \
  "" \
  200

test_api \
  "获取特定标签文章" \
  "GET" \
  "/api/posts?tag=测试" \
  "" \
  200

test_api \
  "限制返回数量" \
  "GET" \
  "/api/posts?limit=2" \
  "" \
  200

test_api \
  "获取单篇文章详情" \
  "GET" \
  "/api/posts/test-tags-featured" \
  "" \
  200

# ========================================
# 第三组：更新文章
# ========================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   第三组：更新文章                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

test_api \
  "更新单篇文章（添加标签）" \
  "PATCH" \
  "/api/posts/test-tags-featured" \
  '{
    "excerpt": "更新后的摘要 - 标签已添加",
    "tags": ["测试", "标签", "API", "已更新"]
  }' \
  200

test_api \
  "批量更新文章状态" \
  "PATCH" \
  "/api/posts" \
  '{
    "ids": ["post.test-tags-featured", "post.restful-api-test"],
    "updates": {
      "status": "published",
      "tags": ["批量更新", "测试"]
    }
  }' \
  200

# ========================================
# 第四组：Markdown 导入
# ========================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   第四组：Markdown 导入               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}注意：以下测试需要确保 posts/ 目录中有对应的 Markdown 文件${NC}"
echo ""

test_api \
  "导入 Markdown 文件" \
  "POST" \
  "/api/admin/import-markdown" \
  '{
    "files": ["welcome-to-markdown.md"]
  }' \
  200

# ========================================
# 第五组：删除文章（可选，谨慎测试）
# ========================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   第五组：删除文章（可选）            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}⚠️  警告：以下测试会删除文章，跳过以避免数据丢失${NC}"
echo -e "${YELLOW}如需测试，请取消注释以下命令：${NC}"
echo ""
echo "# test_api \\"
echo "#   \"删除单篇文章\" \\"
echo "#   \"DELETE\" \\"
echo "#   \"/api/posts/test-tags-featured\" \\"
echo "#   \"\" \\"
echo "#   200"
echo ""
echo "# test_api \\"
echo "#   \"批量删除文章\" \\"
echo "#   \"DELETE\" \\"
echo "#   \"/api/posts?ids=post.draft-test\" \\"
echo "#   \"\" \\"
echo "#   200"

# ========================================
# 测试结果汇总
# ========================================
echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          测试结果汇总                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo "总测试数: $total_tests"
echo -e "${GREEN}通过: $passed_tests${NC}"
echo -e "${RED}失败: $failed_tests${NC}"
echo ""

if [ $failed_tests -eq 0 ]; then
  echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║       🎉 所有测试通过！              ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
  exit 0
else
  echo -e "${RED}╔════════════════════════════════════════╗${NC}"
  echo -e "${RED}║       ❌ 有测试失败！                 ║${NC}"
  echo -e "${RED}╚════════════════════════════════════════╝${NC}"
  exit 1
fi
