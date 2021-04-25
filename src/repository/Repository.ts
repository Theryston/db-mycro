import fs from 'fs';
import { Database } from '../database/Database'

interface IColumn {
  name: string;
  type: 'string' | 'number' | 'array' | 'object';
  isPrimary?: boolean;
  autoIncrement?: boolean;
  default?: any;
}

interface IRepository {
  name: string;
  columns: IColumn[];
  db: Database;
}

export class Repository {
  public name: string;
  public dbName: string;
  public path: string;
  public columns: IColumn[];

  constructor({ name, columns, db }: IRepository) {
    this.name = name;
    this.columns = columns;
    this.dbName = db.name;
  }
}