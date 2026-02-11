import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// 内存用户存储
const users: any[] = [];

export async function POST(request: Request) {
  try {
    console.log("[Register] Starting registration...");
    
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: "无效的请求数据" },
        { status: 400 }
      );
    }
    
    const { email, password, name } = body;
    console.log("[Register] Email:", email, "Name:", name);

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

    // 检查用户是否已存在
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "该邮箱已被注册" },
        { status: 400 }
      );
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 12);

    // 创建用户
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      isAdmin: false,
      isMember: false,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    console.log("[Register] User created:", newUser.id);

    return NextResponse.json({
      success: true,
      message: "注册成功",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error: any) {
    console.error("[Register] Error:", error);
    return NextResponse.json(
      { error: error.message || "注册失败，请稍后重试" },
      { status: 500 }
    );
  }
}
