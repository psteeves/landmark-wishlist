FROM node:10

ENV NODE_VERSION=12.8.1

WORKDIR /srv/app/

COPY public /srv/app/public
COPY src /srv/app/src
COPY package.json .env /srv/app/

RUN npm install

CMD ["npm", "start"]
