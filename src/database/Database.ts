import fs from "fs";
import path from "path";
import { Repository } from "../repository/Repository";

export class Database {
  public name: string;
  public path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.save();
  }

  save() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.mkdirSync(this.path);
      }
      if (!fs.existsSync(this.path + "/db-mycro")) {
        fs.mkdirSync(this.path + "/db-mycro");
      }
      if (!fs.existsSync(this.path + "/db-mycro/" + this.name)) {
        fs.mkdirSync(this.path + "/db-mycro/" + this.name);
      }

      this.path = this.path + "/db-mycro/" + this.name;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getAllRepositories() {
    try {
      const repositoriesPaths = fs.readdirSync(this.path);
      const repositories: Repository[] = [];

      for (let repositoryPath of repositoriesPaths) {
        const repository = new Repository({
          name: repositoryPath.replace(/.json/gi, ""),
          db: this,
        });
        repositories.push(repository);
      }

      return repositories;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
