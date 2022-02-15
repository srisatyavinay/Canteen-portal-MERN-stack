FROM node:16.13.2-alpine3.15

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf ./etc/nginx/conf.d/default.conf
COPY --from=0 /app/frontend/build /usr/share/nginx/html
