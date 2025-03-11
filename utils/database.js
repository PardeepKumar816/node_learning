
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'ePlanet0@', { dialect: 'mysql', host: 'localhost' });






module.exports = sequelize;