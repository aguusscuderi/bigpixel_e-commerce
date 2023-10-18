import { Sequelize } from 'sequelize';
require('dotenv').config()

console.log('Intentando conectar a:', process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD)

const db = new Sequelize("postgres://BIGPIXELUSER:bigpixel2023@postgresdb:5432/BIGPIXELDB");

const db_sync = async () => {
    try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

export { db_sync, db }
// export default db