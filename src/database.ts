import { DataSource } from "typeorm"
import User from "./auth/user";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "onlab",
  entities: [User],
  synchronize: true,
  logging: false,
})
