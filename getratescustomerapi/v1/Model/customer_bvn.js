'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer_bvn");

const model = sequelize.define('customer_bvn', modelMeta);

model.sync({
    force: false
});

module.exports = model;