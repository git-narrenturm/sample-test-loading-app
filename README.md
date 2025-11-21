# Sample Test Loading App

Простое приложение для тестирования производительности эндпоинта GET `api/item` с фронтендом на Vue и бэкендом на NestJS + PostgreSQL + Redis.

## Как запустить проект

1. Клонировать репозиторий:
```
git clone https://github.com/git-narrenturm/sample-test-loading-app.git
cd sample-test-loading-app
```

2. Создать `backend\.env` файл со следующими переменными:

```
NODE_ENV=development
PORT=3000

POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=db
POSTGRES_DB=sampleTestLoadingApp
POSTGRES_PORT=5432

REDIS_HOST=redis
REDIS_PORT=6379

CLEAR_TABLE_BEFORE_SEED=true
```

- NODE_ENV — среда (development/production)
- PORT — порт backend
- POSTGRES_* — данные для подключения к PostgreSQL
- REDIS_* — данные для подключения к Redis
- CLEAR_TABLE_BEFORE_SEED — очищать таблицу item перед seed (true/false)

3. Создать `frontend\.env`файл:
```
VITE_API_URL=http://localhost:3000
```
- VITE_API_URL — URL backend API, к которому будет обращаться фронтенд

4. Запустить docker compose:
```
docker-compose up -d
```

- Backend будет доступен на порту 3000: http://localhost:3000/api/item
- Frontend на порту 5173: http://localhost:5173/
- Postgres и Redis поднимаются автоматически
- Дополнительно поднимется Swagger: http://localhost:3000/swagger

Если нужно изменить порты или параметры БД/Redis, отредактируйте `.env` файлы в папках `backend` и `frontend`.

## Оптимизации эндпоинта GET api/item

Для повышения производительности и снижения нагрузки на базу данных были внесены следующие оптимизации:
1. Индексирование

Создан индекс на колонке `name`, чтобы ускорить сортировку.

2. Redis-кэширование.

При повторном запросе на ту же страницу данные берутся из Redis, минуя базу данных. 

3. Connection pool TypeORM.

Настроен пул соединений к базе через extra: `{ max: 20 }`. При параллельных запросах не возникает ошибок соединения, нагрузка распределяется равномерно.


Визуально на фронтенде при нагрузочном тесте с 2000 запросов и задержкой 1 мс ошибки исчезли, время отклика стало стабильным. Время ответа API снизилось с 12 сек до 5 сек.