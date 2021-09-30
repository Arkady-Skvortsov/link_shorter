<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<span>Mini app, which needed for url link short<span>

## Controller (Url adresses for usage)

```
  (GET) - /link/all - Get all links
  (GET) - /link/current/:title - get current link by her title
  (POST) - /link/create - Create a new link
  ()
  (PUT) - /link/update/:title - Update current link by her title
  (DELETE) - /link/delete/:title - Delete a current link by her title
```

## Docker

```bash
  # build docker image
  $ docker buid -t 389798/link-image .

  # run link-container(makefile)
  $ make link-up

  # run link-container
  $ docker run --rm -p 3000:3000 -d --name link-container 389798/link-image

  # run mongo-link-container
  $ docker run --rm -p 27017:27017 -d --name mongo-link-container -e MONGO_INITDB_ROOT_USERNAME=${MONGO_USER} -e MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD} mongo

  # Create network for containers
  $ docker network create link-network

  # run couple containers
  $ docker-compose up
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
