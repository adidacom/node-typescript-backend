### Getting Started

#### Docker
- Run `docker-compose up`

#### Without Docker

- Run `npm install`
- Run `npm run typeorm migration:run`*
- Run `npm run watch`

\* You need to set environment variables to provide configuration for database connection. Please see `src/config.ts` for environment variable names.

---

After the server is setup, you will be provided with an API Key on the terminal.
The API will be useable from the documentation available at http://localhost:3000/docs.

---

### Available Scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `watch` - automatically restart the application when file changes in the directory are detected
  
---

#### Tech stack

- [Docker] as the container service to isolate the environment.
- [Node.js](Long-Term-Support Version) as the run-time environment to run JavaScript.
- [Express.js]as the server framework / controller layer
- [Postgre SQL]as the database layer
- [TypeORM] as the "ORM" / model layer
- [TypeDI] Dependency Injection for TypeScript.
- [Routing-Controllers] Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express using TypeScript and Routing Controllers Framework.
- [Helmet] Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!
- [Swagger] API Tool to describe and document your api
