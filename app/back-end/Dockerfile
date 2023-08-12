FROM node:18-alpine

WORKDIR /usr/back-end
COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "dev"]
