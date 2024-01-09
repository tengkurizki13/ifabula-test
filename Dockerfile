FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

CMD ["sh", "-c", "npm run undo && npm run migrate && npm run start"]
