# Hello, Node.js!

## Docker

```Bash
# Create .env file base on template file:
cp .env.template .env

npm i

docker-compose build
docker-compose up # or npm start
```

When installing new dependencies, don't forget to install them within docker-container as well:

```
npm run docker:install
```

## Tests

```
npm t
```

## Postgres

```Bash
docker exec -it hello-node_db_1 sh

psql -U <user name>

\l # list of all DB
\c hello # connect to "hello" DB
\dt # Show data bases tables
```

## Redis

```Bash
docker exec -it hello-node_redis_1 redis-cli
```

## TODOs

- [x] TypeScript
- [x] Docker
- [x] Postgres DB
- [x] TypeOrm
- [x] OpenAPI
- [x] Tests
- [ ] Migrations
- [x] Redis
- [ ] 'Todo app' example
- [ ] App Deployment
