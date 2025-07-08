FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json tsconfig.json vite.config.ts ./
COPY src ./src
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
