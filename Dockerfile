FROM node:4-slim

RUN apt-get update -qq && apt-get install -y -qq

RUN npm install npm -g

COPY package.json .

RUN npm i --silent --production

ADD . .

CMD ["npm", "run", "build"]

EXPOSE 3000
CMD ["npm", "run", "start-live"]
