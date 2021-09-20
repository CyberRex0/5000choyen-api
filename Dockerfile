FROM node:14-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY . .

RUN \
    apk add --no-cache \
        cairo \
        pango \
        libjpeg-turbo \
        libpng \
        giflib \
        librsvg \
        pixman \
        libwebp && \
    apk add --no-cache --virtual build-deps \
        gcc \
        g++ \
        cairo-dev \
        pango-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        giflib-dev \
        librsvg-dev \
        pixman-dev \
        libwebp-dev \
        python3=3.8.10-r0 \
        make=4.2.1-r2  \
        pkgconf=1.6.3-r0 && \
    npm install && \
    apk del build-deps

EXPOSE 8080

CMD ["node", "main.js"]

