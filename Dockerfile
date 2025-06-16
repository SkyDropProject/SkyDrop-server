FROM node:18 AS builder

WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/app.js"]
