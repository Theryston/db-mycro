import { Database, Repository } from './index';

const DBtestes = new Database('test', __dirname+'/../')
const test = new Repository({
  name: 'testando',
  columns: [
    { name: 'id', type: 'number', isPrimary: true, autoIncrement: true },
    { name: 'test', type: 'string' }
  ],
  db: DBtestes
})

console.log(test)