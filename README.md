# Storefront Backend Project

Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase. what we have to do is architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.
the starting project was provided by [Udacity](https://github.com/udacity/nd0067-c2-creating-an-api-with-postgresql-and-express-project-starter)

# Installations

1. run `yarn` in your terminal at the project root. to download all dependencies to the project.
2. I decided to work locally . you have to install [postgres](https://www.postgresql.org/) first ,then create shopping database

```
$ psql -h localhost -U postgres
$ CREATE DATABASE shopping;
CREATE DATABASE
$ CREATE DATABASE shopping_test;
CREATE DATABASE
```

3. now you can test the project by typing this command

```
$ yarn test
```

![results](/Jasmine%20Test%20results.bmp)

4. Starting the project

```
yarn start
```

# Port

the app runs on port 3000 with database on 5432.

# Environment variable

![dotenv](/dotenv.bmp)

**IMPORTANT: .env should be added to .gitignore**

# Development

1. installing all dependencies we need you can see it in package.json
2. create folder structure for src folder
   - sr
     - handlers
       - tests
     - models
       - tests
     - database.ts // for connection with database
     - server.ts // to creating out express server
3. building our models and use jasmine to testing it.
4. implementing handlers to creat our endpoints and use supertest to testing it by jasmine.
5. finally test the whole project by **yarn test /or npm run test**
