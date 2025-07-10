FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

# Adiciona permissão de execução
RUN chmod +x /app/node_modules/.bin/tsx

EXPOSE 3000

# Executa as migrações e inicia o servidor
CMD npx prisma migrate deploy && (npx prisma db seed || echo "Seed já executado ou falhou - continuando...") && npm run dev