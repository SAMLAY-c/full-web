// ============================================
// @repo/ui - 统一设计系统组件库
// Unified Design System Component Library
// ============================================

// 基础组件
export { Button } from "./button";
export type { ButtonProps } from "./button";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from "./card";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  CardImageProps,
} from "./card";

export { Input, Textarea, Label, InputGroup } from "./input";
export type {
  InputProps,
  TextareaProps,
  LabelProps,
  InputGroupProps,
} from "./input";

export { Badge, Tag, TagGroup, StatusBadge } from "./badge";
export type {
  BadgeProps,
  TagGroupProps,
  StatusBadgeProps,
} from "./badge";

// 设计令牌
export * from "./tokens";

// 旧组件（保持向后兼容，建议迁移到新组件）
export { Hero } from "./hero";
export { ProductCard } from "./product-card";
export { ProjectGrid } from "./project-grid";
export { ResumeButton } from "./resume-button";
