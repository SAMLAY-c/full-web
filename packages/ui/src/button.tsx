import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@repo/utils";

// ============================================
// Button 组件 - 统一设计系统
// 支持多种变体、尺寸和状态
// ============================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体样式
   * @default "primary"
   */
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";

  /**
   * 按钮尺寸
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "icon";

  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean;

  /**
   * 加载状态的提示文字
   * @default "加载中..."
   */
  loadingText?: string;

  /**
   * 是否占满宽度
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 是否作为子元素，移除默认样式
   * @default false
   */
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      loadingText = "加载中...",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // 变体样式映射
    const variants = {
      primary:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-primary",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
      outline:
        "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary",
      ghost:
        "hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive",
      link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
    };

    // 尺寸样式映射
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-11 px-8 text-base",
      icon: "h-10 w-10 p-2",
    };

    // 基础样式
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    // 加载状态样式
    const loadingStyles = loading ? "cursor-wait opacity-70" : "";

    // 宽度样式
    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loadingStyles,
          widthStyles,
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            {loadingText}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// 加载动画组件
function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4 animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button };
