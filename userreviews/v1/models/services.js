'use strict';

const Sequelize = require('../Config/sequelizeConn');
const modelMeta = require('../modelMeta/services');

const model = Sequelize.define('services',modelMeta);

// model.sync({force:false});

module.exports = model;