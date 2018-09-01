'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/improvement_areas');


const model = Sequelize.define('improvement_areas', modelMeta);

//model.sync({
//    force: true
//});

module.exports = model;