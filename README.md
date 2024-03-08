## Creacion de proyecto

```bash

$ nest new project-name

```
## Instalacion npm

```bash
$ npm install
```
## Instalacion de Nestjs

```bash
$ npm i -g@nestjs/cli
```

## Dependencias
```bash

# .env
$ npm install dotenv
# .class validator
$ npm install class-validator class-transformer -SE
# Variables de Entorno( Uso de .env)
$ npm install @nestjs/config
# Type ORM
$ npm install @nestjs/typeorm typeorm mysql2
# Swagger
$ npm i @nestjs/swagger -SE

```

## Ejecucion del proyecto
```bash
$ npm run start:dev
```
## Creación de entidades

```bash
$ nest g res usuario --no-spec
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```