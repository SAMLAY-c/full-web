import type { HTMLAttributes, forwardRef } from "react";
import { cn } from "@repo/utils";

// ============================================
// Card 组件 - 统一设计系统
// 支持多种变体和丰富的子组件
// ============================================

// Card 主组件
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 卡片变体样式
   * @default "default"
   */
  variant?: "default" | "elevated" | "outlined" | "ghost";

  /**
   * 是否启用悬停效果
   * @default false
   */
  hover?: boolean;

  /**
   * 是否可点击
   * @default false
   */
  clickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", hover = false, clickable = false, ...props },
    ref
  ) => {
    // 变体样式映射
    const variants = {
      default:
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
      elevated:
        "rounded-xl border border-border bg-card text-card-foreground shadow-md",
      outlined:
        "rounded-xl border-2 border-border bg-card text-card-foreground",
      ghost:
        "rounded-xl border border-transparent bg-transparent text-card-foreground hover:border-border",
    };

    // 悬停效果
    const hoverStyles = hover
      ? "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      : "";

    // 点击效果
    const clickableStyles = clickable
      ? "cursor-pointer active:scale-[0.98] transition-transform"
      : "";

    return (
      <div
        ref={ref}
        className={cn(variants[variant], hoverStyles, clickableStyles, className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// CardHeader 组件
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

// CardTitle 组件
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// CardDescription 组件
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

// CardContent 组件
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

// CardFooter 组件
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0 gap-2", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

// CardImage 组件
export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  aspectRatio?: "video" | "square" | "wide" | "auto";
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  (
    { className, src, alt = "", aspectRatio = "video", ...props },
    ref
  ) => {
    const aspectStyles = {
      video: "aspect-video",
      square: "aspect-square",
      wide: "aspect-[21/9]",
      auto: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-t-xl",
          aspectStyles[aspectRatio],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }
);

CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};