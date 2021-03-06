[<img src="https://ik.imagekit.io/Theryston/Frame_1__1__jeC54DOiF.png" width="400px">](https://www.npmjs.com/package/db-mycro)

A node module with a json database that saves data in a specific directory, similar to sqlite, but in JSON

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

This is just a database created for small applications, small things, or even just for educational purposes, if you don't want to configure a whole database just use db-mycro

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

IMPORTANT: read the documentation until the end, and never forget the [save method](#save)

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
  const db_video = new Database('video', __dirname)
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

- ```name``` The repository name.

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

 ```name``` (string mandatory) the column name.

 ```type``` (string mandatory) the column type, can be: ```'string' | 'number' | 'array' | 'object' | 'boolean'```

 ```isPrimary``` (boolean optional) indicates if the field is the id of that data. default ```false```

 ```autoIncrement``` (boolean optional) if it is true for each insertion in the repository it will add 1 in this field. only works with type ```number```. default ```false```

 ```default``` (optional and of the same type that was entered in the ```type``` parameter) this is a default value for if the column value is null. default ```null```

 ```allowNull``` (boolean optional) if true the field cannot be null. default ```false```

 IMPORTANT: this is optional if the column was undefined or a empty array your repository will allow all data type, without validation

### Repository Methods

 repositories have some methods that allow you to add, list, update, and delete data. never forget the [save method](#save).

#### .add(datas: object[])

 ```ts
 Video.add([{
  minutes: 10
}])
 ```

 add data to a repository, receive an object array where each object must be of the explicit type in the ```type``` parameter in the column property

#### .find(params?: { where?: string; offset?: number; limit?: number; })

 ```ts
 Video.find({
 where: "data.minutes == 10",
 offset: 2,
 limit: 10
 })
 ```

 returns the data registered in the repository. the only one that doesn't need the [save method](#save) to be executed after its execution

 receive optional parameters:

 ```where``` (string) a condition of what data will be returned. you can access each data from the ```data``` prefix.

 ```offset``` (number) after which index the data will be fetched.

 ```limit``` (number) a limit on how much data will be fetched

#### .update({ where: string, data: object })

 ```ts
 Video.update({
  where: "data.id == 10",
  data: { minutes: 15 }
})
 ```

 update data based on the ```data``` property where a ```where``` property is true, you can access each data within the ```where``` property string by the ```data``` prefix

#### .delete(where?: string)

 ```ts
 Video.delete('data.id == 10')
 ```

 delete data based on where the ```where``` property is true, you can access each data within the ```where``` property string by the ```data``` prefix.

#### .save()

 ```ts
 Video.save()
 ```

 all changes that are made by any method in a repository ARE NOT SAVED they just change the local memory of the repository to ensure better performance of db-mycro. that's why you should always, after making the changes in the repository, execute the save method as in the example above (replacing "Video" by the variable that stores the instance of your repository)
