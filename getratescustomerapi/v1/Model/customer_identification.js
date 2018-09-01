'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer_identification");

const model = sequelize.define('customer_identification', modelMeta);

model.sync({
    force: false
});

module.exports = model;