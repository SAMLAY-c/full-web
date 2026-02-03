"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("邮箱或密码错误");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">欢迎回来</h1>
          <p className="text-muted-foreground">登录以继续访问您的账户</p>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-8">
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            还没有账户？{" "}
            <Link href="/register" className="text-primary hover:underline">
              立即注册
            </Link>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg text-xs text-muted-foreground">
            <p className="font-medium mb-1">测试账号：</p>
            <p>邮箱: admin@example.com</p>
            <p>密码: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
