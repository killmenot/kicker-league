# Kicker League

## Starting App

**Without Migrations**

```
npm install
npm start
```

**With Migrations**

```
npm install
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an sqlite database in your app dir.
Just open [http://localhost:4000](http://localhost:4000).

## Running Tests

We have added some [Mocha](https://mochajs.org) based test. You can run them by `npm test`