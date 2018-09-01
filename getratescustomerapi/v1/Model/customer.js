'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/customer");
//relationships:
const custSocial = require('./customer_social_media');
const socialPlatform = require('./social_media_platform');
const customer_phone_number = require('./customer_phone_number');
const phone_number = require('./phone_number');
const email_address = require('./email_address');
const customer_email_address = require('./customer_email_address');

const model = sequelize.define('customer', modelMeta);

model.belongsToMany(socialPlatform,{through:custSocial});
socialPlatform.belongsToMany(model,{through:custSocial});
customer_phone_number.belongsTo(phone_number);
customer_email_address.belongsTo(email_address);
custSocial.belongsTo(socialPlatform);
custSocial.belongsTo(model);

socialPlatform.sync({force: false});
custSocial.sync({force:false});
model.sync({force:false});

module.exports = model;