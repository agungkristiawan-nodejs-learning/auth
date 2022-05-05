FROM node:16-alpine
WORKDIR  /usr/src/app
RUN chown node:node .
COPY package*.json ./
COPY tsconfig*.json ./
COPY src src
RUN apk update 
RUN npm i
RUN npm run build
USER node
ENTRYPOINT [ "node","dist/index.js" ]