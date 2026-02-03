import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// 需要认证的路由
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/protected/:path*"],
};

export default withAuth(
  function middleware(req) {
    // 可以在这里添加额外的权限检查
    const token = req.nextauth.token;
    
    // 检查管理员权限
    if (req.nextUrl.pathname.startsWith("/admin") && !token?.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // 如果没有token，未授权
        if (!token) return false;
        
        // 允许访问
        return true;
      },
    },
  }
);
