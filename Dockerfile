FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsup.config.ts ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN mkdir -p /data && chown node:node /data && ln -s /app/dist/index.js /usr/local/bin/rwmcp && chmod +x /app/dist/index.js
USER node
VOLUME ["/data"]
EXPOSE 3100
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD wget -qO- http://127.0.0.1:3100/healthz >/dev/null || exit 1
ENTRYPOINT ["node", "/app/dist/index.js"]
