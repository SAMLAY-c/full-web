# 🧠 Claude Code Hooks 自动复盘系统

> 每次会话自动记录，自动生成复盘报告

---

## 📦 已创建的文件

### 项目目录
```
.claude/
├── scripts/
│   ├── log_prompt.sh         # 记录每次提问
│   ├── log_failure.sh         # 记录工具失败
│   └── finalize_retro.sh      # 会话结束生成复盘
└── .claude-logs/
    ├── .gitignore             # 忽略临时文件
    ├── session.jsonl          # 临时会话日志
    └── RETRO.md               # 📖 持久化复盘日志
```

### 全局配置（已自动创建）
```
~/.claude/hooks.yaml           # Hooks 配置文件
```

---

## 🚀 如何使用

### 1. 自动记录（无需操作）

当你正常使用 Claude Code 时，系统会自动：
- ✅ 记录你提出的每个问题
- ✅ 记录每次工具失败
- ✅ 会话结束时生成复盘

### 2. 查看复盘

```bash
# 查看最新复盘
cat .claude-logs/RETRO.md

# 或用你喜欢的编辑器打开
code .claude-logs/RETRO.md
```

### 3. 复盘格式

```markdown
## 🧠 Session 2026-01-29 00:07

### 🔹 我提出的问题
- 测试用户提示

### ⚠️ 遇到的问题
- [bash] 测试错误信息

### ✅/❌ 结果
- 问题已解决 / 仍存在 X 个未解决问题
```

---

## 🔧 技术细节

### Hooks 触发时机

| Hook | 触发时机 | 记录内容 |
|------|---------|---------|
| `UserPromptSubmit` | 每次提问 | 问题内容 |
| `PostToolUseFailure` | 工具失败 | 工具名 + 错误信息 |
| `SessionEnd` | 会话结束 | 生成 RETRO.md |

### 数据流转

```
用户提问 → log_prompt.sh → session.jsonl
工具失败 → log_failure.sh → session.jsonl
会话结束 → finalize_retro.sh → RETRO.md
                                      ↓
                              清空 session.jsonl
```

---

## 📝 注意事项

1. **全局配置需要手动设置**
   - `~/.claude/hooks.yaml` 已经创建
   - Claude Code 会自动读取

2. **每个项目独立**
   - 每个项目有自己的 `.claude-logs/`
   - 复盘日志按项目分开存储

3. **session.jsonl 临时文件**
   - 已在 `.gitignore` 中忽略
   - 每次会话结束自动清空

---

## 🎯 实用建议

### 定期查看复盘
```bash
# 每周查看一次
cat .claude-logs/RETRO.md | tail -100
```

### 导出分享
```bash
# 复制到其他地方
cp .claude-logs/RETRO.md ~/Documents/claude-retro.md
```

### AI 分析复盘
```markdown
# 可以直接把 RETRO.md 丢给 AI：
"请分析我的 RETRO.md，找出我最常遇到的问题类型"
```

---

## 📚 相关资源

- [Claude Code Hooks 文档](https://claude.com/claude-code/hooks)
- [项目配置最佳实践](https://claude.com/claude-code/configuration)

---

**开始使用吧！什么都不用记，专心写代码就好 ✨**
