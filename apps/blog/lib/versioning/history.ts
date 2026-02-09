/**
 * 本地文章历史版本管理系统
 * 不依赖 Git，永久保存所有修改历史
 */

import fs from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';

export interface Version {
  id: string;
  timestamp: number;
  date: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  author: string;
  changeSummary?: string;
}

export interface DiffResult {
  lineNumber: number;
  type: 'added' | 'removed' | 'modified';
  oldContent?: string;
  newContent?: string;
}

const HISTORY_DIR = path.join(process.cwd(), '.history');

/**
 * 确保历史目录存在
 */
async function ensureHistoryDir() {
  try {
    await fs.access(HISTORY_DIR);
  } catch {
    await fs.mkdir(HISTORY_DIR, { recursive: true });
  }
}

/**
 * 生成版本 ID
 */
function generateVersionId(slug: string, timestamp: number): string {
  return `${slug}_${timestamp}_${createHash('md5').update(slug + timestamp).digest('hex').slice(0, 6)}`;
}

/**
 * 获取文章的历史文件路径
 */
function getArticleHistoryPath(slug: string): string {
  return path.join(HISTORY_DIR, `${slug}.jsonl`);
}

/**
 * 保存新版本
 */
export async function saveVersion(data: Omit<Version, 'id' | 'timestamp' | 'date'>): Promise<Version> {
  await ensureHistoryDir();
  
  const timestamp = Date.now();
  const version: Version = {
    ...data,
    id: generateVersionId(data.slug, timestamp),
    timestamp,
    date: new Date().toISOString(),
  };
  
  const historyPath = getArticleHistoryPath(data.slug);
  const line = JSON.stringify(version) + '\n';
  
  // 追加到文件（JSON Lines 格式）
  await fs.appendFile(historyPath, line, 'utf-8');
  
  console.log(`[History] Saved version ${version.id} for "${data.title}"`);
  return version;
}

/**
 * 获取文章的所有历史版本
 */
export async function getVersions(slug: string): Promise<Version[]> {
  try {
    const historyPath = getArticleHistoryPath(slug);
    const content = await fs.readFile(historyPath, 'utf-8');
    
    return content
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line))
      .reverse(); // 最新的在前
  } catch {
    return [];
  }
}

/**
 * 获取特定版本
 */
export async function getVersion(slug: string, versionId: string): Promise<Version | null> {
  const versions = await getVersions(slug);
  return versions.find(v => v.id === versionId) || null;
}

/**
 * 对比两个版本的差异（行级）
 */
export function diffVersions(oldVersion: Version, newVersion: Version): DiffResult[] {
  const oldLines = oldVersion.content.split('\n');
  const newLines = newVersion.content.split('\n');
  const results: DiffResult[] = [];
  
  const maxLines = Math.max(oldLines.length, newLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];
    
    if (oldLine === undefined && newLine !== undefined) {
      // 新增行
      results.push({
        lineNumber: i + 1,
        type: 'added',
        newContent: newLine,
      });
    } else if (oldLine !== undefined && newLine === undefined) {
      // 删除行
      results.push({
        lineNumber: i + 1,
        type: 'removed',
        oldContent: oldLine,
      });
    } else if (oldLine !== newLine) {
      // 修改行
      results.push({
        lineNumber: i + 1,
        type: 'modified',
        oldContent: oldLine,
        newContent: newLine,
      });
    }
  }
  
  return results;
}

/**
 * 获取版本统计信息
 */
export async function getVersionStats(slug: string): Promise<{
  totalVersions: number;
  firstVersion: Date | null;
  lastVersion: Date | null;
  averageChangesPerDay: number;
}> {
  const versions = await getVersions(slug);
  
  if (versions.length === 0) {
    return {
      totalVersions: 0,
      firstVersion: null,
      lastVersion: null,
      averageChangesPerDay: 0,
    };
  }
  
  const timestamps = versions.map(v => v.timestamp).sort((a, b) => a - b);
  const firstDate = new Date(timestamps[0]);
  const lastDate = new Date(timestamps[timestamps.length - 1]);
  const daysDiff = Math.max(1, (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    totalVersions: versions.length,
    firstVersion: firstDate,
    lastVersion: lastDate,
    averageChangesPerDay: versions.length / daysDiff,
  };
}

/**
 * 清理旧版本（保留最近 N 个）
 */
export async function cleanupOldVersions(slug: string, keepCount: number = 100): Promise<void> {
  const versions = await getVersions(slug);
  
  if (versions.length <= keepCount) return;
  
  const versionsToKeep = versions.slice(0, keepCount);
  const historyPath = getArticleHistoryPath(slug);
  
  // 重写文件，只保留最近的版本
  const lines = versionsToKeep
    .sort((a, b) => a.timestamp - b.timestamp) // 按时间排序
    .map(v => JSON.stringify(v))
    .join('\n') + '\n';
  
  await fs.writeFile(historyPath, lines, 'utf-8');
  console.log(`[History] Cleaned up ${slug}, kept ${keepCount} versions`);
}

/**
 * 导出所有历史到单个 JSON 文件（备份用）
 */
export async function exportAllHistory(): Promise<Record<string, Version[]>> {
  await ensureHistoryDir();
  
  const files = await fs.readdir(HISTORY_DIR);
  const result: Record<string, Version[]> = {};
  
  for (const file of files) {
    if (file.endsWith('.jsonl')) {
      const slug = file.replace('.jsonl', '');
      result[slug] = await getVersions(slug);
    }
  }
  
  return result;
}

/**
 * 创建完整的备份
 */
export async function createBackup(): Promise<string> {
  const backupDir = path.join(process.cwd(), '.backups');
  await fs.mkdir(backupDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `history-backup-${timestamp}.json`);
  
  const allHistory = await exportAllHistory();
  await fs.writeFile(backupPath, JSON.stringify(allHistory, null, 2), 'utf-8');
  
  console.log(`[History] Backup created: ${backupPath}`);
  return backupPath;
}
