# 1. Build Stage
FROM node:lts-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Build the application
COPY . .
RUN mkdir -p public
RUN npm run build

# 2. Production Stage
FROM node:lts-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone output from the build stage
COPY --from=build /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

# Run as a non-root user
USER node

EXPOSE 3000
ENV PORT 3000

# Start the server
CMD ["node", "server.js"] 