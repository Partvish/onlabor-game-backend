import { DataSource } from "typeorm";
import User from "./src/auth/user";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 8080,
    username: "root",
    password: "",
    database: "onlab",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})