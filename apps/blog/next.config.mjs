/** @type {import('next').NextConfig} */
const nextConfig = {
  // 服务器端渲染模式（Netlify 支持）
  // 移除 output: 'export' 以启用 SSR
  
  // 图片优化配置
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  
  // 工作区包 transpile
  transpilePackages: ["@repo/ui", "@repo/utils"],
  
  // 尾部斜杠处理
  trailingSlash: true,
  
  // 忽略 TypeScript 错误（构建时）
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // 忽略 ESLint 错误（构建时）
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
