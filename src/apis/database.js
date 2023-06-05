// import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

dotenv.config();

let sequelize;

try {
  console.log(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD
  );
  // sequelize = new Sequelize(
  //   process.env.DB_NAME,
  //   process.env.DB_USERNAME,
  //   process.env.DB_PASSWORD,
  //   {
  //     host: process.env.URL_HOST,
  //     dialect: 'mariadb',
  //   }
  // );
  sequelize = new Sequelize(
    'octopoda',
    'dbmasteruser',
    'd$owo1F8[AmEGZ)rhft)m4*[xS&w)dD}',
    {
      host: 'ls-5be5e577c9fc5608894357ea2a1209e94283aab9.cdnfefyqoluc.ap-southeast-1.rds.amazonaws.com',
      dialect: 'mysql',
    }
  );
} catch (error) {
  console.error('Failed to connect to the database:', error);
}

export default sequelize;
