FROM node:16-alpine

RUN npm install -g @angular/cli@13.3.3

WORKDIR /app
