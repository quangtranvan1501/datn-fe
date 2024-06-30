# Sử dụng image node 16 chính thức
FROM node:16-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng Angular
RUN npm run build --prod

# Sử dụng image nginx chính thức
FROM nginx:alpine

# Sao chép build của Angular vào thư mục mặc định của nginx để phục vụ ứng dụng
COPY --from=builder /app/dist/your-angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
