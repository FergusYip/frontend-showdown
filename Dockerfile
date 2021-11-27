FROM node:16-bullseye-slim

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY prisma ./
RUN yarn prisma generate

COPY . .

RUN yarn build

RUN yarn install --production

CMD ["yarn", "start"]
