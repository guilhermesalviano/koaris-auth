FROM node:20-alpine AS builder

RUN command -v yarn || npm install -g yarn

FROM builder AS dependecies

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/.yarn-cache \
  && yarn install --cache-folder /usr/src/app/.yarn-cache

COPY . .

RUN yarn install
RUN yarn run build
RUN rm -rf node_modules

# Final image
FROM node:20-alpine AS deploy

LABEL name="koaris-auth" version="1.0" maintainer="Guilherme Salviano"

RUN apk add --no-cache \
  tzdata \
  curl \
  && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
  && echo "America/Sao_Paulo" > /etc/timezone

ENV TZ 'America/Sao_Paulo'

WORKDIR /usr/src/app

# COPY --from=dependecies /usr/src/app/node_modules ./node_modules
COPY --from=dependecies /usr/src/app/dist ./dist
COPY --from=dependecies /usr/src/app/prisma ./prisma
COPY --from=dependecies /usr/src/app/tsconfig.json ./tsconfig.json
COPY --from=dependecies /usr/src/app/package.json ./package.json

RUN yarn install --production

EXPOSE 3333

USER node

CMD ["yarn", "run", "start"]
# CMD [ "app.handler" ]