import type { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@repo/utils";

// ============================================
// Badge/Tag 组件 - 统一设计系统
// 支持多种变体、尺寸和可删除状态
// ============================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 徽章变体样式
   * @default "default"
   */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "success"
    | "warning"
    | "error"
    | "info";

  /**
   * 徽章尺寸
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * 是否可删除
   * @default false
   */
  removable?: boolean;

  /**
   * 删除回调函数
   */
  onRemove?: () => void;

  /**
   * 左侧图标
   */
  leftIcon?: ReactNode;

  /**
   * 右侧图标
   */
  rightIcon?: ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      removable = false,
      onRemove,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    // 变体样式映射
    const variants = {
      default:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      primary:
        "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground",
      accent:
        "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
      outline: "border-border text-foreground hover:bg-accent",
      success:
        "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      warning:
        "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      error:
        "border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    };

    // 尺寸样式映射
    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
    };

    // 基础样式
    const baseStyles =
      "inline-flex items-center gap-1 rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && !removable && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-0.5 -mr-0.5 inline-flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`移除 ${children}`}
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Tag 组件（Badge 的别名，语义化命名）
const Tag = Badge;

// TagGroup 组件 - 标签组
export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 标签数据
   */
  tags?: Array<{
    id: string;
    label: string;
    variant?: BadgeProps["variant"];
  }>;

  /**
   * 是否可删除
   * @default false
   */
  removable?: boolean;

  /**
   * 删除标签回调
   */
  onTagRemove?: (id: string) => void;

  /**
   * 子元素（自定义标签内容）
   */
  children?: ReactNode;

  /**
   * 间距大小
   * @default "sm"
   */
  gap?: "xs" | "sm" | "md";
}

const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(
  (
    {
      className,
      tags,
      removable = false,
      onTagRemove,
      children,
      gap = "sm",
      ...props
    },
    ref
  ) => {
    const gapStyles = {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center", gapStyles[gap], className)}
        {...props}
      >
        {tags?.map((tag) => (
          <Badge
            key={tag.id}
            variant={tag.variant || "default"}
            removable={removable}
            onRemove={removable ? () => onTagRemove?.(tag.id) : undefined}
          >
            {tag.label}
          </Badge>
        ))}
        {children}
      </div>
    );
  }
);

TagGroup.displayName = "TagGroup";

// StatusBadge 组件 - 状态徽章（简化版）
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 状态类型
   */
  status: "success" | "warning" | "error" | "info" | "pending";

  /**
   * 自定义文本
   */
  text?: string;

  /**
   * 是否显示圆点
   * @default true
   */
  showDot?: boolean;
}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, text, showDot = true, ...props }, ref) => {
    const statusConfig = {
      success: {
        label: "成功",
        dotColor: "bg-green-500",
        badgeVariant: "success" as const,
      },
      warning: {
        label: "警告",
        dotColor: "bg-yellow-500",
        badgeVariant: "warning" as const,
      },
      error: {
        label: "错误",
        dotColor: "bg-red-500",
        badgeVariant: "error" as const,
      },
      info: {
        label: "信息",
        dotColor: "bg-blue-500",
        badgeVariant: "info" as const,
      },
      pending: {
        label: "待处理",
        dotColor: "bg-orange-500",
        badgeVariant: "warning" as const,
      },
    };

    const config = statusConfig[status];

    return (
      <Badge ref={ref} variant={config.badgeVariant} className={className} {...props}>
        {showDot && (
          <span
            className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)}
          />
        )}
        {text || config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

export { Badge, Tag, TagGroup, StatusBadge };
