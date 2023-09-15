FROM node:20.4.0-alpine as builder
ENV REACT_APP_API_URL=http://127.0.0.1:3000
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build