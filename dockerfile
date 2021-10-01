FROM node:latest

WORKDIR /linkapp

COPY package*.json ./ 

RUN npm install

COPY / ./

ENV MONGO_USER "Arkadiy"
ENV MONGO_PASSWORD "rambler555"

EXPOSE 3000 

CMD ["npm", "run", "start"]