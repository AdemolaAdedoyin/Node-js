'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/social_media_platform");

const model = sequelize.define('social_media_platform', modelMeta);

model.sync({
    force: false
});

module.exports = model;