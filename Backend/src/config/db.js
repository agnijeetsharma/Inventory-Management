
import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected ✅');
  } catch (err) {
    console.error('Unable to connect to DB:', err.message);
  }
};

module.exports = { sequelize, connectDB };
