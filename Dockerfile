FROM node:14.17.1

MAINTAINER smj

RUN mkdir -p /dist

WORKDIR /dist

ADD . /dist

RUN npm install

ENV NODE_ENV prod

EXPOSE 3000 80

CMD ["npm","run","prod"]

