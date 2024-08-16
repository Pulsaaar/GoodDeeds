# Используем официальный образ Node.js
FROM node:18-alpine AS base

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем зависимости отдельно для оптимизации кеширования
# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем Prisma схему и генерируем Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# RUN npx prisma db push

# Копируем весь остальной код
COPY . .

# Команда для запуска в режиме разработки
CMD ["sh", "-c", "npx prisma migrate dev --name init; npm run start"]

EXPOSE 5000
