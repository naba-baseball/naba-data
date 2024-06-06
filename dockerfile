FROM docker.io/node:22-alpine AS base
WORKDIR /usr/app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY package.json pnpm-lock.yaml /usr/app/

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . /usr/app/
RUN pnpm build

FROM base
COPY --from=build /usr/app/.output /usr/app/

EXPOSE 3000
RUN chown -R node:node /usr/app
USER node
CMD ["node", "server/index.mjs"]