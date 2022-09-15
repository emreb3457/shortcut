FROM node:17

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@8.19.2
RUN npm install --force
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]