FROM node:18 AS builder

WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM node:18-slim

WORKDIR /app

RUN npm install -g pnpm
COPY package*.json ./
RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/app.js"]
