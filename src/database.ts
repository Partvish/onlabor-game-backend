import { DataSource } from "typeorm"
import User from "./auth/user";
import Player from "./entities/player";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "onlab",
    entities: [User, Player],
    synchronize: true,
    logging: false,
  })
  
   AppDataSource.initialize()
    .then(() => {

    })
    .catch((error) => console.log(error))