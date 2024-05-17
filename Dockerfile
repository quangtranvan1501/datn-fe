# Step 1: Build the app in image 'builder'
FROM node:16-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

# FROM nginx:1.21.3-alpine

# # Use COPY --link to avoid breaking cache if we change the second stage base image
# COPY --link nginx.conf /etc/nginx/conf.d/default.conf

# COPY --link --from=builder /usr/src/app/dist/datn_frontend2/ /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

CMD [ "npm", "start" ]