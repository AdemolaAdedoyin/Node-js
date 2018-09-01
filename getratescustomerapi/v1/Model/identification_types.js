'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/identification_type");

const model = sequelize.define('identification_type', modelMeta);

model.sync({
    force: false
});

module.exports = model;