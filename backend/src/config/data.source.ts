import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({
  path:
    process.env.NODE_ENV !== "test"?  (process.env.NODE_ENV !== undefined ? `.env.production` : ".env") : ".env.test"
});
const Config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // url : 'mysql://root:r0uOgyuFoQ49TqR0DYDE@containers-us-west-158.railway.app:6262/railway',
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  
};

export const AppDataSource: DataSource = new DataSource(Config);