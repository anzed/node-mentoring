FROM node:8
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD [ "node_modules/.bin/sequelize", "db:migrate", "npm", "start" ]
