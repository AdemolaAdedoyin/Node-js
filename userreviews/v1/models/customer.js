'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/customer');


const model = Sequelize.define('customer', modelMeta);

// model.sync({force: false});

module.exports = model;