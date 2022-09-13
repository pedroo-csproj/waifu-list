FROM node:18 AS builder

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

RUN yarn install
RUN yarn prisma generate

COPY . .

RUN yarn build

FROM node:18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/dist ./dist

CMD [ "yarn", "start:prod" ]
