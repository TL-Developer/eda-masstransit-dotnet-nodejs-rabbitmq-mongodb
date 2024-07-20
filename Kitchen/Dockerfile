FROM node:18-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8088

CMD [ "npm", "start" ]