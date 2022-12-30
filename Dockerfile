FROM node:16-alpine AS build

RUN apk --no-cache add curl && \ 
  curl -sL https://unpkg.com/@pnpm/self-installer | node


USER node
WORKDIR /home/node

COPY package.json .
COPY tsconfig.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY ./packages/core/package.json /home/node/packages/core
COPY ./apps/basic/package.json /home/node/apps/basic

RUN pnpm install --frozen-lock --dev

COPY --chown=node:node apps/ apps/
COPY --chown=node:node packages/ packages/

RUN pnpm run -r build && \
  pnpm install --ignore-scripts --prod

ENTRYPOINT [ "node"  ]
CMD [ "apps/basic/dist/index.cjs" ]