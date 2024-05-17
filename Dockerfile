# Step 1: Build the app in image 'builder'
FROM node:16-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

# Step 2: Use build output from 'builder'
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/datn_frontend2/ .

EXPOSE 80