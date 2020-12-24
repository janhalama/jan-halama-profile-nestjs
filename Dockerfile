# build
FROM node:14-alpine as builder

ENV NODE_ENV build

# node-prune installation requirements
RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# install nestjs cli
RUN yarn global add @nestjs/cli

WORKDIR /app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile

COPY . .

# build application
RUN yarn build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

# runtime
FROM node:14-alpine

ENV NODE_ENV production
ENV PORT 3000

USER node
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/src/main.js"]
