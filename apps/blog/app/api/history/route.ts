/**
 * 历史版本 API
 */

import { NextRequest, NextResponse } from "next/server";
import { 
  saveVersion, 
  getVersions, 
  getVersion, 
  diffVersions,
  createBackup,
  getVersionStats
} from "@/lib/versioning/history";

/**
 * GET /api/history?slug=xxx
 * 获取文章的所有历史版本
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const versionId = searchParams.get("versionId");
    const action = searchParams.get("action");

    if (!slug) {
      return NextResponse.json(
        { error: "slug is required" },
        { status: 400 }
      );
    }

    // 获取特定版本
    if (versionId) {
      const version = await getVersion(slug, versionId);
      if (!version) {
        return NextResponse.json(
          { error: "Version not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ version });
    }

    // 获取统计信息
    if (action === "stats") {
      const stats = await getVersionStats(slug);
      return NextResponse.json({ stats });
    }

    // 获取所有版本
    const versions = await getVersions(slug);
    return NextResponse.json({ versions });
  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/history
 * 保存新版本
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, excerpt, content, tags, status, author, changeSummary } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "slug, title, and content are required" },
        { status: 400 }
      );
    }

    const version = await saveVersion({
      slug,
      title,
      excerpt: excerpt || "",
      content,
      tags: tags || [],
      status: status || "draft",
      author: author || "unknown",
      changeSummary,
    });

    return NextResponse.json({ 
      success: true, 
      version,
      message: "Version saved successfully"
    });
  } catch (error) {
    console.error("Save version error:", error);
    return NextResponse.json(
      { error: "Failed to save version" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/history/compare
 * 对比两个版本
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, oldVersionId, newVersionId } = body;

    if (!slug || !oldVersionId || !newVersionId) {
      return NextResponse.json(
        { error: "slug, oldVersionId, and newVersionId are required" },
        { status: 400 }
      );
    }

    const oldVersion = await getVersion(slug, oldVersionId);
    const newVersion = await getVersion(slug, newVersionId);

    if (!oldVersion || !newVersion) {
      return NextResponse.json(
        { error: "One or both versions not found" },
        { status: 404 }
      );
    }

    const diff = diffVersions(oldVersion, newVersion);

    return NextResponse.json({
      oldVersion: {
        id: oldVersion.id,
        date: oldVersion.date,
        changeSummary: oldVersion.changeSummary,
      },
      newVersion: {
        id: newVersion.id,
        date: newVersion.date,
        changeSummary: newVersion.changeSummary,
      },
      diff,
      totalChanges: diff.length,
      addedLines: diff.filter(d => d.type === "added").length,
      removedLines: diff.filter(d => d.type === "removed").length,
      modifiedLines: diff.filter(d => d.type === "modified").length,
    });
  } catch (error) {
    console.error("Compare versions error:", error);
    return NextResponse.json(
      { error: "Failed to compare versions" },
      { status: 500 }
    );
  }
}
