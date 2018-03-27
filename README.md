# Kicker League

## Pre-Install

```
cp .env.example .env # then set env variables
```

## Development

```
npm install
npm run dev:db:rebuild
npm run dev
```


## Production

### Without Migrations

```
npm install
npm start
```

### With Migrations

```
npm install
npm run db:migrate
npm start
```


## Run

Just open [http://localhost:4000](http://localhost:4000).


## Tests

```
npm test
```