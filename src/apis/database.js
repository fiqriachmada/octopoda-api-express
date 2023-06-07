// import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

let sequelize;

try {
  sequelize = new Sequelize(
    // 'octopoda',
    process.env.DB_USERNAME,
    // 'dbmasteruser',
    process.env.DB_NAME,
    // 'd$owo1F8[AmEGZ)rhft)m4*[xS&w)dD}',
    process.env.DB_PASSWORD,
    {
      // host: 'ls-5be5e577c9fc5608894357ea2a1209e94283aab9.cdnfefyqoluc.ap-southeast-1.rds.amazonaws.com',
      host: process.env.URL_HOST,
      dialect: 'mysql',
    }
  );
} catch (error) {
  console.error('Failed to connect to the database:', error);
}

export default sequelize;
