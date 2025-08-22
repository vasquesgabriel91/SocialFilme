import { Sequelize } from 'sequelize';
import dbConfig from './config/config.js'; 

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging
  }
);

export default sequelize;
