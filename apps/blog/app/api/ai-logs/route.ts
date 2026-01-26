import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface LogEntry {
  timestamp: string;
  git: {
    branch: string;
    commit: string;
    remote: string;
    user: string;
    email: string;
  };
  data: {
    type: string;
    tool?: string;
    description?: string;
    command?: string;
    [key: string]: any;
  };
}

export async function GET() {
  try {
    // 读取 worklog.jsonl 文件
    const worklogPath = join(process.cwd(), '../../.ai/worklog.jsonl');

    const content = await readFile(worklogPath, 'utf-8');

    // 解析每一行 JSON
    const logs: LogEntry[] = content
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((log): log is LogEntry => log !== null)
      .reverse(); // 按时间倒序

    return NextResponse.json({ logs });
  } catch (error) {
    // 文件不存在或其他错误时返回空数组
    console.error('Error reading AI logs:', error);
    return NextResponse.json({ logs: [] }, { status: 200 });
  }
}
