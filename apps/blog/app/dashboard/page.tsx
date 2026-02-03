"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">请先登录</p>
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            去登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl shadow-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                欢迎回来，{session.user?.name}
              </h1>
              <p className="text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
            >
              退出登录
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted rounded-xl">
              <h2 className="text-lg font-semibold mb-2">账户状态</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">会员状态</span>
                  <span className={session.user?.isMember ? "text-green-600" : "text-muted-foreground"}>
                    {session.user?.isMember ? "✓ 会员" : "普通用户"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">管理员</span>
                  <span className={session.user?.isAdmin ? "text-green-600" : "text-muted-foreground"}>
                    {session.user?.isAdmin ? "✓ 是" : "否"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-muted rounded-xl">
              <h2 className="text-lg font-semibold mb-2">快捷操作</h2>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="block p-3 bg-background rounded-lg hover:bg-accent transition-colors"
                >
                  📚 浏览文章
                </Link>
                <Link
                  href="/"
                  className="block p-3 bg-background rounded-lg hover:bg-accent transition-colors"
                >
                  🏠 返回首页
                </Link>
              </div>
            </div>
          </div>

          {!session.user?.isMember && (
            <div className="mt-8 p-6 bg-primary-50 rounded-xl border border-primary-200">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">
                升级会员
              </h3>
              <p className="text-primary-700 mb-4">
                解锁所有付费内容，获取专属学习资源
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                立即升级
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
