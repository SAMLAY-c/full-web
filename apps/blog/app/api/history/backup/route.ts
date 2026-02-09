/**
 * 历史版本备份 API
 */

import { NextResponse } from "next/server";
import { createBackup } from "@/lib/versioning/history";

/**
 * POST /api/history/backup
 * 创建完整备份
 */
export async function POST() {
  try {
    const backupPath = await createBackup();
    return NextResponse.json({
      success: true,
      backupPath,
      message: "Backup created successfully",
    });
  } catch (error) {
    console.error("Backup error:", error);
    return NextResponse.json(
      { error: "Failed to create backup" },
      { status: 500 }
    );
  }
}
