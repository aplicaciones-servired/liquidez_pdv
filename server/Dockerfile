FROM node:slim

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Compilar el código
RUN yarn build

EXPOSE 5000

# Ahora ya existe /app/dist/index.js
CMD ["node", "--env-file=.env", "./dist/index.js"]
