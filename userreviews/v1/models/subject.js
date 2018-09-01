'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/subject');


const model = Sequelize.define('subject', modelMeta);

model.sync({force: false});

module.exports = model;