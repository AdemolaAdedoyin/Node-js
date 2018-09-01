'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/subjectType');


const model = Sequelize.define('subject_type', modelMeta);

model.sync({force: false});

module.exports = model;