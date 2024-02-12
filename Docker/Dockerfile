# FROM node:10.22.1
# MAINTAINER srwoo <srwoo@hyundaiht.co.kr>

# RUN mkdir -p /app
# RUN mkdir -p /home/ht-homeservice-webapp
# WORKDIR /app
# ADD . /app
# WORKDIR /app/ht-homeservice-webapp
# RUN npm install
# ENTRYPOINT npm start && bash


FROM node:18.19.0
LABEL email selim0915@gmail.com
LABEL name srwoo

RUN mkdir -p /app
RUN mkdir -p /home/react-frontend-project
WORKDIR /app
ADD . /app
WORKDIR /app/react-frontend-project
RUN npm install
# VOLUME ["/app/react-frontend-project/asset/png", "/c/Users/srwoo/Desktop/sampeople"]

EXPOSE 8082
CMD ["npm", "run", "start"]