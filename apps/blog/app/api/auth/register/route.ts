import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/password";
import { createUser } from "@/lib/auth/user-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // 验证输入
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "请填写所有必填字段" },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "请输入有效的邮箱地址" },
        { status: 400 }
      );
    }

    // 验证密码强度
    if (password.length < 8) {
      return NextResponse.json(
        { error: "密码至少需要8个字符" },
        { status: 400 }
      );
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      isMember: false,
    });

    return NextResponse.json({
      success: true,
      message: "注册成功",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "注册失败" },
      { status: 500 }
    );
  }
}
