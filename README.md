<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

This is a personal project developed with Nestjs
This project creates a Nestjs app, a postgres database image and a database manager(pgAdmin4) with Docker, so you must have Docker installed in your machine.
You can access the database once it is up and running in the following url:
http://localhost:5050/

To run the project:

1. You must create a .env file in the root path of the app with the following properties:
   POSTGRES_DB="tvservice"
   POSTGRES_USER="username"
   POSTGRES_PASSWORD="password"
2. In the command line type the following command:
   docker-compose up --build
