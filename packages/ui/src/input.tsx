import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  LabelHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";
import { cn } from "@repo/utils";

// ============================================
// Input 组件 - 统一设计系统
// 包含 Input、Textarea、Label 和 InputGroup
// ============================================

// Input 组件
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 输入框尺寸
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * 错误状态
   * @default false
   */
  error?: boolean;

  /**
   * 左侧图标
   */
  leftIcon?: ReactNode;

  /**
   * 右侧图标
   */
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, size = "md", error = false, leftIcon, rightIcon, ...props },
    ref
  ) => {
    // 尺寸样式
    const sizeStyles = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-3 py-2 text-sm",
      lg: "h-12 px-4 py-3 text-base",
    };

    // 错误样式
    const errorStyles = error
      ? "border-error focus-visible:ring-error"
      : "border-input focus-visible:ring-ring";

    // 图标间距
    const iconPadding = {
      left: leftIcon ? "pl-10" : "",
      right: rightIcon ? "pr-10" : "",
    };

    const inputElement = (
      <input
        ref={ref}
        className={cn(
          "flex w-full rounded-lg border bg-background ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeStyles[size],
          errorStyles,
          iconPadding.left,
          iconPadding.right,
          className
        )}
        {...props}
      />
    );

    // 如果有图标，包装在相对定位容器中
    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          {inputElement}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return inputElement;
  }
);

Input.displayName = "Input";

// Textarea 组件
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 错误状态
   * @default false
   */
  error?: boolean;

  /**
   * 最小行数
   * @default 3
   */
  minRows?: number;

  /**
   * 最大行数
   */
  maxRows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, minRows = 3, ...props }, ref) => {
    const errorStyles = error
      ? "border-error focus-visible:ring-error"
      : "border-input focus-visible:ring-ring";

    return (
      <textarea
        ref={ref}
        rows={minRows}
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border bg-background px-3 py-2 text-sm",
          "ring-offset-background placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-y",
          errorStyles,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

// Label 组件
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * 是否必填
   * @default false
   */
  required?: boolean;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required = false, disabled = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none",
          disabled && "cursor-not-allowed opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

// InputGroup 组件 - 组合 Label + Input + Error Message
export interface InputGroupProps {
  /**
   * 标签文本
   */
  label?: string;

  /**
   * 标签的 htmlFor 属性
   */
  htmlFor?: string;

  /**
   * 是否必填
   * @default false
   */
  required?: boolean;

  /**
   * 错误消息
   */
  error?: string;

  /**
   * 帮助文本
   */
  helperText?: string;

  /**
   * 子元素（通常是 Input 或 Textarea）
   */
  children: ReactNode;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 标签自定义类名
   */
  labelClassName?: string;
}

function InputGroup({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className,
  labelClassName,
}: InputGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required} className={labelClassName}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

export { Input, Textarea, Label, InputGroup };
