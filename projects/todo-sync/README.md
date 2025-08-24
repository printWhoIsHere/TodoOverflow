# Todo Template

## Особенности

- **Socket.IO** — двусторонняя синхронизация задач между клиентами в реальном времени.
- **Express.js** — простой REST API + WebSocket сервер.
- **Монорепозиторий** — фронтенд и бэкенд в одном репо через Yarn Workspaces.
- **Vite** — быстрая сборка и HMR для фронтенда.
- **Winston** — логирование на сервере.

<!-- Badges -->
<div align="center">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white&style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" />
  
  <br/>
  
  <img alt="Socket.io" src="https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white&style=for-the-badge" />
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge" />
  <img alt="Yarn Berry" src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white&style=for-the-badge" />
</div>

## Демонстрация

![TodoSync Demo](../../assets/images/todo-sync-demo.png)

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/printWhoIsHere/TodoOverflow.git
cd TodoOverflow/projects/todo-template

# Установка зависимостей
yarn install

# Запуск dev-сервера (front и back одновременно)
yarn dev

```

## Настройка `.env`

Для корректной работы проекта необходимо создать файл .env в корне frontend и backend (на примере .env.example):

### Backend

```bash
# env

PORT=3000
HOST=0.0.0.0
```

### Frontend

```bash
# env

VITE_API_BASE_URL=/api
# Прямое подключение к backend по LAN
VITE_SOCKET_ENDPOINT=http://<LAN_IP>:5173

# Через Vite proxy
VITE_SOCKET_ENDPOINT=/socket.io
```
