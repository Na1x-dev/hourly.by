# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем код приложения
COPY . .

# Строим приложение
RUN npm run build

# Устанавливаем сервер для статических файлов
RUN npm install -g serve

# Команда запуска приложения
CMD ["serve", "-s", "build"]
