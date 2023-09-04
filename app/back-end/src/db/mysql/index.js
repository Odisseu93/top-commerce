const {
	MYSQL_HOST: HOST,
	MYSQL_DB: DB,
	MYSQL_PASSWORD: PASSWORD,
	MYSQL_USER: USER
} = process.env;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB, USER, PASSWORD, {
	host: HOST,
	dialect: 'mysql'
}); 

module.exports = sequelize;