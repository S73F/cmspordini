FROM node:22.13.1-alpine3.21
RUN addgroup app && adduser -S -G app app 
USER app
WORKDIR /app
COPY . .
RUN npm install

FROM composer:2.8.8
WORKDIR /app
COPY . .
RUN composer install

EXPOSE 3000
CMD ['php artisan serve', 'npm run dev']