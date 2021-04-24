import { Database, Repository } from './index';

const db = new Database('testes')
const repository = new Repository({
  name: 'testando',
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'test', type: 'string' }
  ],
  db: db
})
console.log(repository)