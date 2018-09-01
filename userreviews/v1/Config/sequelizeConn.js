'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://byjcfzvgsptbxu:12ce27e9a67dfd34dcbd3e9912b284831b8a8150a3df04e70782794239bb0f1f@ec2-54-163-234-20.compute-1.amazonaws.com:5432/d1ddmg4s2sp069', {
    dialect: 'postgres',
    host: 'ec2-54-163-234-20.compute-1.amazonaws.com',
    port: 5432,
    dialectOptions: {
        native: true,
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

});

module.exports = sequelize;