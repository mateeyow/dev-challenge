FROM node:12.20.0-alpine

WORKDIR /app

COPY server/yarn.lock .
COPY server/package.json .

RUN yarn

ENV PORT=8080 NODE_ENV=production DEBUG=server:server

COPY server .

EXPOSE 8080

CMD [ "./node_modules/.bin/babel-node", "./bin/www" ]