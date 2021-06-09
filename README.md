# db-mycro
a database that saves your data in a json file in your project folder.

# Where to use?
Important: db-mycro IS NOT a database made to hold all your application data! read the text below to better understand. 

this is just an auxiliary database, designed to hold data that is not that important but that you need to keep. an example is when you need to save in the database how long of a video your user has watched, instead of overloading your main database (MySQL, MongoDB...) to save something simple like this, you can use db-mycro for that.

# Install

## npm
```bash
  npm i --save db-mycro
```

## yarn
```bash
  yarn add db-mycro
```

# Docs
Our database consists of 2 main methods, the database and the repository

## Database
the database method creates a database in which you will store your repositories (if you don't know what a repository in db-mycro is, read on).

### import
#### Javascript
```js
  const { Database } = require('db-mycro');
```
#### Typescript
```ts
  import { Database } from 'db-mycro';
```
