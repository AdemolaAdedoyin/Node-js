'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer_social_meida");

const model = sequelize.define('customer_social_media', modelMeta);

model.sync({
    force: false
});

module.exports = model;