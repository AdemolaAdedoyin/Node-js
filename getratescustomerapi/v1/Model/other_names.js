'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/other_names");

const model = sequelize.define('other_names', modelMeta);

model.sync({
    force: false
});

module.exports = model;