import fs from 'fs';

export class Database {
  public name: string;

  constructor(name: string) {
    this.name = name
  }
}

interface IColumn {
  name: string;
  type: string;
  isPrimary ? : boolean;
  autoIncrement ? : boolean;
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