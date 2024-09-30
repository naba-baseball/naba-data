FROM docker.io/node:22-alpine AS base
WORKDIR /usr/app
COPY package.json .npmrc package-lock.json /usr/app/

FROM base AS build
RUN npm ci 
COPY . /usr/app/
RUN npm run build

FROM base
COPY --from=build /usr/app/.output /usr/app/

EXPOSE 3000
RUN chown -R node:node /usr/app
USER node
CMD ["node", "server/index.mjs"]