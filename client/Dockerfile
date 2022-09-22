FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=prod

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]