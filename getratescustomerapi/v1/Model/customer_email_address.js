'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer_email_address");

const model = sequelize.define('customer_email_address', modelMeta);

model.sync({
    force: false
});

module.exports = model;