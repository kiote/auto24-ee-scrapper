FROM node:10.7.0-alpine AS base
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    bash \
    ttf-freefont \
    chromium

COPY . .

RUN npm install

CMD ["node", "scrape.js"]
