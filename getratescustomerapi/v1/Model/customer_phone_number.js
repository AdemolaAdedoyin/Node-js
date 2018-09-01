'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer_phone_number");

const model = sequelize.define('customer_phone_number', modelMeta);

model.sync({
    force: false
});

module.exports = model;