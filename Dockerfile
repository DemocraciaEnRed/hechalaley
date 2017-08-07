FROM node:8-slim

MAINTAINER Matías Lescano <matias@democraciaenred.org>

WORKDIR /usr/src

COPY ["package.json", "/usr/src/"]
COPY ["package-lock.json", "/usr/src/"]

ENV NODE_ENV=production

RUN npm install --loglevel warn

COPY [".", "/usr/src/"]

ENV MONGO_URL=mongodb://mongo/hechalaley

# RUN npm run build -- --minify

EXPOSE 3000

CMD ["node", "."]
