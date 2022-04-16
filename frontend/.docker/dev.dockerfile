FROM node:16-alpine

RUN npm install -g @angular/cli

WORKDIR /app
