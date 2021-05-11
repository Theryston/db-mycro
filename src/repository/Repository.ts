import fs from 'fs';
import { Database } from '../database/Database'

interface IColumn {
  name: string;
  type: 'string' | 'number' | 'array' | 'object' | 'boolean';
  isPrimary ? : boolean;
  autoIncrement ? : boolean;
  default ? : any;
  allowNull ? : boolean;
}

interface IRepository {
  name: string;
  columns: IColumn[];
  db: Database;
}

interface IFind {
  where ? : string;
  offset ? : number;
  limit ? : number;
}

export class Repository {
  public name: string;
  public db: Database;
  public path: string;
  public columns: IColumn[];
  private datas ? : object[];

  constructor({ name, db, columns }: IRepository) {
    this.name = name;
    this.columns = columns;
    this.db = db;
    this.datas = []
    this.path = this.db.path + '/' + this.name + '.json'
    this.initDatas()
  }

  private initDatas() {
    if (fs.existsSync(this.path)) {
      this.datas = JSON.parse(fs.readFileSync(this.path, "utf8"))
    } else {
      const datas = JSON.stringify(this.datas)
      fs.writeFileSync(this.path, datas)
    }
  }

  public add(datas: object[]) {
    for (let i in datas) {
      const data = {}

      for (let j in this.columns) {
        if (this.columns[j].autoIncrement && this.columns[j].type != 'number') {
          throw new Error(`the type of the '${this.columns[j].name}' value must be 'number' to use autoIncrement`)
        }

        if (this.columns[j].autoIncrement) {
          if (!this.datas[this.datas.length - 1]) {
            datas[i][this.columns[j].name] = 0
          } else {
            datas[i][this.columns[j].name] = this.datas[this.datas.length - 1][this.columns[j].name] + 1
          }
        }

        if (this.columns[j].default && !datas[i][this.columns[j].name]) {
          datas[i][this.columns[j].name] = this.columns[j].default
          data[this.columns[j].name] = this.columns[j].default
        }

        if (typeof(datas[i][this.columns[j].name]) != this.columns[j].type || Array.isArray(datas[i][this.columns[j].name]) && this.columns[j].type != 'array') {
          throw new Error(`invalid data type to add in column '${this.columns[j].name}' in repository '${this.name}' of db-mycro`)
        }

        if (!datas[i][this.columns[j].name] && !this.columns[j].allowNull && !this.columns[j].default && !this.columns[j].autoIncrement) {
          throw new Error(`invalid data to add in column '${this.columns[j].name}' in repository '${this.name}' of db-mycro`)
        }

        if (this.columns[j].isPrimary) {
          const existsPrimary = this.datas.find(d => d[this.columns[j].name] == datas[i][this.columns[j].name])
          if (existsPrimary) {
            console.error('the primary key already exists')
            datas[i][this.columns[j].name] = this.datas[this.datas.length - 1][this.columns[j].name] + 1
          }
        }

        data[this.columns[j].name] = datas[i][this.columns[j].name]

      }
      this.datas.push(data)
    }
  }

  public async save(): Promise < void > {
    const datas = JSON.stringify(this.datas)
    fs.writeFileSync(this.path, datas)
  }

  public find(params ? : IFind) {
    let datas = this.datas

    if (params) {
      if (params.where) {
        datas = datas.filter(data => eval(params.where))
      }

      if (params.limit && params.offset) {
        datas = datas.slice(params.offset, params.limit);
      } else if (params.limit) {
        datas = datas.slice(0, params.limit)
      } else if (params.offset) {
        datas = datas.slice(params.offset, datas.length)
      }
    }

    return datas;
  }

  public update(params: { where: string, data: object }) {
    const datas = this.datas.filter(data => eval(params.where))

    for (let j in this.columns) {
      if (this.columns[j].autoIncrement && this.columns[j].type != 'number') {
        throw new Error(`the type of the '${this.columns[j].name}' value must be 'number' to use autoIncrement`)
      }

      if (params.data[this.columns[j].name] && typeof(params.data[this.columns[j].name]) != this.columns[j].type || Array.isArray(params.data[this.columns[j].name]) && this.columns[j].type != 'array') {
        throw new Error(`invalid data type to update in column '${this.columns[j].name}' in repository '${this.name}' of db-mycro`)
      }

      if (this.columns[j].isPrimary) {
        if (params.data[this.columns[j].name]) {
          params.data[this.columns[j].name] = null
          console.error(`A primary key cannot be updated!`)
        }
      }

      const indexes = []
      for (let i = 0; i <= datas.length; i++) {
        const index = this.datas.findIndex((data, j) => eval(params.where) && j > indexes[indexes.length - 1])
        indexes.push(index)
      }
      indexes.splice(0, 1)

      for (let i in indexes) {
        if (params.data[this.columns[j].name] != null) {
          this.datas[indexes[i]][this.columns[j].name] = params.data[this.columns[j].name]
        }
      }
    }

    return params.data;
  }

  public delete(where ? : string) {
    const datas = this.datas.filter(data => eval(where))

    try {
      return datas.length
    } catch (e) {
      throw e
    }
  }
}