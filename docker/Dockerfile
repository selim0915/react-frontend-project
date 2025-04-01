FROM node:18.19.0
LABEL email selim0915@gmail.com
LABEL name srwoo

RUN mkdir -p /app
RUN mkdir -p /home/react-frontend-project
WORKDIR /app
ADD . /app
WORKDIR /app/react-frontend-project
RUN npm install

EXPOSE 80
CMD ["npm", "run", "start"]