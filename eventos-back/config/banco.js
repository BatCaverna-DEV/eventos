import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.HOST
const DB_DIALECT = process.env.DB_DIALECT

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    timezone: "-03:00",
})

sequelize.authenticate().then(function() {
    console.log('Conectado com sucesso ao banco de dados!')
}).catch(function(err) {
    console.error('Falha na conexão: '+err);
})

export default {Sequelize, sequelize}