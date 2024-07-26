import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Connection option
const sqlDB = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.PRODUCTION_DB
  } else {
    return process.env.MYSQL_DB
  }
};

const sequelize = new Sequelize(sqlDB());

export default sequelize;