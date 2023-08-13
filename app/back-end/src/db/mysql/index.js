const { Sequelize } = require('sequelize')

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB,
} = process.env

console.log({ HOST, USER, PASSWORD, DB})

const dbConfig = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql'
});

module.exports = { dbConfig }
