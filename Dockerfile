FROM mhart/alpine-node:10

COPY . .

RUN apk update && apk add bash
RUN npm install

CMD ["node", "scrape.js"]
