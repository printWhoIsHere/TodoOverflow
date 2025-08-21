# Todo Template

---

## Особенности

- **Feature-Sliced Design** - логическое разделение по слоям и фичам, удобство масштабирования.
- **React Query** - кеширование и удобная логика загрузки данных.
- **JSON Viewer** - компонент для красивого отображения объектов/ответов API.
- **MSW Mocking** - моки для локальной разработки и интеграционных тестов.
- **OpenAPI Schema** - спецификация для типов и контрактов API; генерация типов через openapi-typescript.
- **Модульная архитектура** - легко добавлять новые фичи и переиспользовать код.

<!-- Badges -->
<div align="center">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white&style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" />
  
  </br>

  <img alt="React Query" src="https://img.shields.io/badge/React_Query-FF4154?logo=reactquery&logoColor=white&style=for-the-badge" />
  <img alt="MSW" src="https://img.shields.io/badge/MSW-FF6A33?logo=mockserviceworker&logoColor=white&style=for-the-badge" />
  <img alt="OpenAPI" src="https://img.shields.io/badge/OpenAPI-6BA539?logo=openapiinitiative&logoColor=white&style=for-the-badge" />
</div>

## Демонстрация

![TodoTemplate Demo](../../assets/images/todo-template-demo.png)

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/printWhoIsHere/TodoOverflow.git
cd TodoOverflow/projects/todo-template

# Установка зависимостей
yarn install

# Запуск dev-сервера (Vite)
yarn dev
```

## Доступные команды

```bash
yarn dev   # Запуск Vite в режиме разработки
yarn api   # Генерация типов OpenAPI (npx openapi-typescript ...)
```
