"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          登录
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          注册
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        {session.user?.name}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        退出
      </button>
    </div>
  );
}
