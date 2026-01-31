# 使用Nginx作为Web服务器
FROM nginx:alpine

# 复制构建好的Studio文件
COPY apps/studio/dist /usr/share/nginx/html

# 复制nginx配置
COPY apps/studio/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
