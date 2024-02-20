FROM node:20.4.0-alpine as builder

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build

ENTRYPOINT npx react-inject-env set