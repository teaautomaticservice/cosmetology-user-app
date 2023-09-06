FROM node:20.4.0-alpine as builder
ENV REACT_APP_API_URL=http://http://192.168.10.3/:3000
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build

FROM nginx
EXPOSE 4000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html