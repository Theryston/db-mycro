[<img src="https://ik.imagekit.io/Theryston/Frame_1__1__jeC54DOiF.png" width="400px">](https://www.npmjs.com/package/db-mycro)

a database that saves your data in a json file in your project folder.

```ts
import { Database, Repository } from 'db-mycro';

const db_video = new Database('video', __dirname)
const Video = new Repository({
  name: 'video',
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'minutes', type: 'number' }
  ],
  db: db_video
})
```

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
Our database consists of 2 main methods, the database and the repository.

IMPORTANT: read the documentation until the end, and never forget the save method.

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

### Creating a new database
```ts
  const DBtestes = new Database('test', __dirname+'/../')
```

the Database function takes two parameters the first is the ```name``` which is the database name and the second which is the ```path``` this is where your database should be saved and then the function returns an instance of the database created (instance in which it will be necessary to assign to the repositories)

## Repository
If you are familiar with MySQL, repositories are like a table in MySQL, if you are not familiar with MySQL, we will explain what a repository is in the text below.

A repository is an object that is created with a specific structure to store your data, for example, if you want to store the number of minutes a user spends watching a video, you can create a repository called ```video``` with a field called ```minutes``` which is the type ```number``` and whenever you need to save new data of the time the user spent watching your video, just save it in the ```minutes``` field of the ```video``` repository.

### import
#### Javascript
```js
  const { Repository } = require('db-mycro');
```
#### Typescript
```ts
  import { Repository } from 'db-mycro';
```

### Creating a new repository
```ts
const Video = new Repository({
  name: 'video',
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'minutes', type: 'number' }
  ],
  db: db_video
})
```

the repository receives an object with 3 mandatory parameters and returns an instance of the created repository.

parameters:

- ```save``` The repository name.

- ```columns``` is [column](#repository-columns) type.

- ```db``` An instance of the database where the repository belongs

### Repository columns
```ts
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'minutes', type: 'number' }
  ]
 ```
 
 the columns of a repository are the fields that the repository will have. They get an array of objects where each object has the essential settings for that column. and each of the objects has the following parameters:
 
 ```name``` (mandatory) the column name.
 
 ```type``` (mandatory) the column type, can be of the types: ```'string' | 'number' | 'array' | 'object' | 'boolean'```
