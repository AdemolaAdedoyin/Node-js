'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/email_address");

const model = sequelize.define('email_address', modelMeta);

model.sync({
    force:false
});

module.exports = model;