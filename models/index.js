const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
})

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});


const db= {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.expenses = require('./expense.model.js')(sequelize, Sequelize);
db.users = require('./user.model.js')(sequelize, Sequelize);

db.expenses.belongsTo(db.users, {foreignKey: 'user_id', targetKey: 'id'});
db.users.hasMany(db.expenses, {foreignKey: 'user_id', sourceKey: 'id'});

module.exports = db;

// Path: backend\models\expenditure.model.js