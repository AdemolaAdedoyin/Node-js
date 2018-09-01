'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer_address");

const model = sequelize.define('customer_address', modelMeta);

model.sync({
    force: false
});

module.exports = model;