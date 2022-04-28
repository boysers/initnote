FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
  npm install -g @angular/cli

RUN ng build

FROM nginx:1.21-alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html
