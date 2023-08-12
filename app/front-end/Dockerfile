FROM node:18-alpine

WORKDIR /usr/front-end
COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 5173

CMD [ "yarn", "dev"]
