FROM node:lts-alpine3.14
RUN apk add --no-cache redis
COPY . /app
WORKDIR /app
RUN npm install
WORKDIR /app/client
RUN npm install
WORKDIR /app
RUN npm install -g concurrently
ENTRYPOINT ["npx","concurrently","redis-server","npm start", "npm start --prefix ./client"]