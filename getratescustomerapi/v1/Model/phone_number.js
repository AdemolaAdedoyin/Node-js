'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/phone_number");

const model = sequelize.define('phone_number', modelMeta);

model.sync({
    force: false
});

module.exports = model;