# Flashcard API

## Description

An API solution built using NestJS, Prisma, and PostgreSQL. It is designed to offer a secure and efficient platform for managing flashcards, complete with authentication and authorization capabilities. The API encompasses user, deck, and flashcard management functionalities.

## Installation

To run this application locally or deploy it to your own server, follow these steps:

  - Clone this repository to your local machine.
      ```bash
      $ git clone https://github.com/asmaatajeldein/flashcard-app.git
      $ cd flashcard-app
      ```
  - Install the required dependencies.
      ```bash
      $ npm install
      # or
      $ yarn install
      ```
  - Update the `.env.example` file.
      ```env
      # databse connection string
      DATABASE_URL=

      # access token secret
      JWT_SECRET=

      # refresh token secret
      RT_SECRET=
      ```
  - Run the database migrations to create the necessary tables in your database.
      ```bash
        $ npx prisma migrate dev
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
Access the application in your web browser at http://localhost:3333.

