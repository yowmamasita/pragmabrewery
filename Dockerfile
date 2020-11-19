# builder
FROM node:lts-alpine

RUN apk update && apk upgrade && apk add --no-cache git yarn

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . /app

RUN yarn start
