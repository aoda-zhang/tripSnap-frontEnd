FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

WORKDIR /app/src/shared
RUN pnpm install

WORKDIR /app
COPY . .

ARG BUILD_COMMAND=build
RUN pnpm run $BUILD_COMMAND

FROM nginx:alpine

COPY --from=builder /app/build /app/k8s/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
