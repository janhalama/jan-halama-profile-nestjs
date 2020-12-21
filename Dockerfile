# build

FROM node:12-alpine as builder

ENV NODE_ENV build

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn global add @nestjs/cli
RUN yarn build

# runtime

FROM node:12-alpine

ENV NODE_ENV production
ENV PORT 3000

USER node
WORKDIR /usr/app

COPY --from=builder /app/ /app/

EXPOSE 3000

CMD ["node", "/app/dist/src/main.js"]
