import { Database } from "./Database";
import { Repository } from "../index";

const db = new Database("initDB", __dirname);

const users = new Repository({
  name: "users",
  db: db,
});

console.log(db.getAllRepositories());
