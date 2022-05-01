FROM boysers/angular-dev:1.0 AS builder

COPY . .

RUN npm install && \
  ng build

FROM nginx:1.21-alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html
