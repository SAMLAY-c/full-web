// ============================================
// 统一设计令牌 - 温暖专业风格
// Unified Design Tokens - Warm Professional Theme
// ============================================

// 颜色系统 (Color System)
export const colors = {
  // 主色 (Primary - 温暖琥珀橙)
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // 主色
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },

  // 中性灰 (Neutral - 暖色调)
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524', // 主文字色
    900: '#1C1917',
    950: '#0C0A09',
  },

  // 强调色 (Accent Colors)
  accent: {
    coral: {
      50: '#FFF1F2',
      100: '#FFE4E6',
      500: '#F43F5E', // 珊瑚红
      600: '#E11D48',
    },
    sage: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      500: '#10B981', // 鼠尾草绿
      600: '#059669',
    },
    sky: {
      50: '#F0F9FF',
      100: '#E0F2FE',
      500: '#0EA5E9', // 天蓝
      600: '#0284C7',
    },
    amber: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      500: '#F59E0B',
      600: '#D97706',
    },
  },

  // 语义化颜色 (Semantic Colors)
  semantic: {
    background: '#FEF7F0',      // 温暖奶油白背景
    surface: '#FFFFFF',          // 纯白表面
    surfaceElevated: '#FEFBF7', // 微浮起表面
    surfacePressed: '#F5F5F4',  // 按下状态

    text: {
      primary: '#292524',   // 温暖深灰（主文字）
      secondary: '#78716C', // 中灰（次要文字）
      tertiary: '#A8A29E',  // 浅灰（占位符）
      inverse: '#FAFAF9',   // 反色文字（用于深色背景）
    },

    border: {
      DEFAULT: '#E7E5E4',    // 暖灰色边框
      light: '#F5F5F4',      // 浅色分隔
      strong: '#D6D3D1',     // 强边框
    },

    // 状态色 (State Colors)
    success: '#10B981',
    warning: '#F59E0B',
    error: '#F43F5E',
    info: '#0EA5E9',
  },
} as const;

// 暗色模式颜色 (Dark Mode Colors)
export const darkColors = {
  semantic: {
    background: '#1C1917',      // 深色背景
    surface: '#292524',          // 深色表面
    surfaceElevated: '#44403C', // 浮起表面
    surfacePressed: '#57534E',  // 按下状态

    text: {
      primary: '#FAFAF9',   // 浅色主文字
      secondary: '#A8A29E', // 次要文字
      tertiary: '#78716C',  // 占位符
      inverse: '#292524',   // 反色文字
    },

    border: {
      DEFAULT: '#44403C',
      light: '#57534E',
      strong: '#78716C',
    },
  },
} as const;

// 间距系统 (Spacing System) - 4px基座
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',     // xs
  2: '8px',     // sm
  3: '12px',
  4: '16px',    // md
  5: '20px',
  6: '24px',    // lg
  8: '32px',    // xl
  10: '40px',
  12: '48px',   // 2xl
  16: '64px',   // 3xl
  20: '80px',
  24: '96px',
} as const;

// 字体系统 (Typography)
export const typography = {
  // 字体家族
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Merriweather', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },

  // 字体大小
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
  },

  // 字体粗细
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // 行高
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// 圆角系统 (Border Radius)
export const borderRadius = {
  none: '0px',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

// 阴影系统 (Shadows)
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // 特殊阴影
  card: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
  cardHover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
  button: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  input: '0 1px 2px 0 rgb(0 0 0 / 0.05), inset 0 1px 2px 0 rgb(0 0 0 / 0.03)',
} as const;

// 过渡动画 (Transitions)
export const transitions = {
  DEFAULT: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// Z-index层级
export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const;

// 断点 (Breakpoints)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// 类型导出
// ============================================
export type ColorScheme = typeof colors;
export type SpacingScale = typeof spacing;
export type TypographyScale = typeof typography;
export type BorderRadiusScale = typeof borderRadius;
export type ShadowScale = typeof shadows;
export type TransitionScale = typeof transitions;
export type ZIndexScale = typeof zIndex;
export type BreakpointScale = typeof breakpoints;
