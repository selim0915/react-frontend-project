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

# 리눅스 파일 시스템 이미지 파일을 컨테이너 내부 정적 파일 경로에 마운트
# VOLUME ["/c/Users/srwoo/Desktop/sampeople:/app/react-frontend-project/src/images/ST"]
# VOLUME ["/path/to/linux/filesystem:/usr/src/app/src/images/ST"]

EXPOSE 8082
CMD ["npm", "run", "start"]