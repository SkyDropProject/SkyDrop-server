FROM node:18 AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install

RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001

CMD ["node", "dist/app.js"]
