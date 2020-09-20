FROM node:12

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV DB_PASSWORD="admin"

CMD ["npm", "start"]