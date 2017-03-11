FROM node:7.6

MAINTAINER Matías Lescano <matias@democraciaenred.org>

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    git

WORKDIR /usr/src

## Avoid losing the cache of nodegit's installation every time the package.json changes. Also, nodegit cannot be installed with --production
RUN npm install nodegit@0.16.0 --quiet

COPY ["package.json", "/usr/src/"]

RUN npm install --production --quiet

COPY [".", "/usr/src/"]

VOLUME ["/billtracker-git"]

ENV NODE_ENV=production \
    MONGO_URL=mongodb://mongo/billtracker \
    BILLS_GIT_PATH=/billtracker-git

RUN npm run build -- --minify

EXPOSE 3000

CMD ["/bin/bash", "-c", "npm run init && npm start"]
