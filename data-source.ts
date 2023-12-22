import { DataSource } from 'typeorm';
import * as process from 'process';

const AppDataSource = new DataSource({
  // type: 'mysql',
  // host: process.env.DB_HOST,
  // port: +process.env.DB_PORT,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  entities: ['./dist/**/*.entity.js'],
  migrations: [''],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
