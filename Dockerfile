FROM node:8.11.3-alpine

MAINTAINER Matías Lescano <matias@democraciaenred.org>

RUN npm install -g npm@6.1.0

WORKDIR /usr/src

COPY ["package.json", "package-lock.json", "/usr/src/"]

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN BLUEBIRD_WARNINGS=0 npm ci

COPY [".", "/usr/src/"]

RUN npm run build

EXPOSE 3000

CMD ["node", "."]
