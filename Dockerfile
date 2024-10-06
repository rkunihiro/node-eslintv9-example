FROM node:20.17.0-bookworm-slim AS deps
ENV NODE_ENV=development
WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

FROM node:20.17.0-bookworm-slim AS build
ENV NODE_ENV=development
WORKDIR /app
COPY . /app
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12:nonroot AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/dist /app/dist
CMD ["--enable-source-maps", "/app/dist/main.mjs"]
