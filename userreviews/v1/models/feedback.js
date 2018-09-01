'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/feedback');


const model = Sequelize.define('feedback', modelMeta);

model.sync({force: false});

module.exports = model;