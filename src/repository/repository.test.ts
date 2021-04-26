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

users.add([{
  name: 'The',
  id: 4
}])

users.save()

console.log(users)