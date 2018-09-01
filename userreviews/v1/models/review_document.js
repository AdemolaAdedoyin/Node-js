'use strict';

const Sequelize = require('../Config/sequelizeConn');
const modelMeta = require('../modelMeta/Review_document');

const model = Sequelize.define('Review_document',modelMeta);

// model.sync({force:false});

module.exports = model;