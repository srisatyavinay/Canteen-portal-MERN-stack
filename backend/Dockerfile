FROM node:16.13.2-alpine3.15

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
