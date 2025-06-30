# 1. Build Stage
FROM node:lts-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build
RUN npm prune --production

# 2. Production Stage
FROM node:lts-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

RUN chown -R node:node /app
USER node

EXPOSE 5000
ENV PORT 5000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "start:prod"] 