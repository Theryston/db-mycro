import { Database } from '../database/Database'
import { Repository } from './Repository'

const DBuser = new Database('user', __dirname)
const users = new Repository({
  name: 'users',
  db: DBuser,
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string', allowNull: true, default: 'funktodo2@gmail.com' }
  ]
})

// users.add([{
//   name: 'The',
//   id: 4
// }, {
//   name: 'bla'
// }])

/*
console.log(users.update({
  where: "data.name == 'The'",
  data: { name: 'Theryyyyyyyyyyyy' }
}));*/

console.log(users.find())

console.log(users.delete('data.email == "funktodo2@gmail.com"'))

console.log(users.find())

users.save()