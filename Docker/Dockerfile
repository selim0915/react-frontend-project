# FROM node:10.22.1
# MAINTAINER srwoo <srwoo@hyundaiht.co.kr>

# RUN mkdir -p /app
# RUN mkdir -p /home/ht-homeservice-webapp
# WORKDIR /app
# ADD . /app
# WORKDIR /app/ht-homeservice-webapp
# RUN npm install
# ENTRYPOINT npm start && bash


FROM node:20.11.0
LABEL email srwoo@hyundaiht.co.kr
LABEL name srwoo

RUN mkdir -p /app
RUN mkdir -p /home/technical-review-project
WORKDIR /app
ADD . /app
WORKDIR /app/technical-review-project
RUN npm install

EXPOSE 8082
CMD ["npm", "run", "dev"]


# syntax = docker/dockerfile:1.0-experimental
# FROM node:8.11.3-alpine

# WORKDIR /private-app
# COPY . /private-app

# RUN --mount=type=secret,id=npm,target=/root/.npmrc npm install

# EXPOSE 3000

# CMD ["node","index.js"]