import fs from 'fs';
import { Database } from '../database/Database'

interface IColumn {
  name: string;
  type: 'string' | 'number' | 'array' | 'object';
  isPrimary ? : boolean;
  autoIncrement ? : boolean;
  default ? : any;
}

interface IRepository {
  name: string;
  columns: IColumn[];
  db: Database;
}

export class Repository {
  public name: string;
  public db: Database;
  public path: string;
  public columns: IColumn[];
  public datas?: object[];

  constructor({ name, columns, db }: IRepository) {
    this.name = name;
    this.columns = columns;
    this.db = db;
    this.datas = [{}]
    this.path = this.db.path + '/' + this.name + '.json'
    this.save()
  }

  public save() {
    if (fs.existsSync(this.path)) {
      this.datas = JSON.parse(fs.readFileSync(this.path, "utf8"))
    } else {
      const datas = JSON.stringify(this.datas)
      fs.writeFileSync(this.path, datas)
    }
  }
}