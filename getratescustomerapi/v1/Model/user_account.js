'use strict';

const sequelize = require('../config/sequelizeConfig');
const modelMeta = require("../modelMeta/user_account");
const customer = require('./customer');

const CPhoneNumber = require('../Model/customer_phone_number');
const phoneNumber = require('../Model/phone_number');
const CEmail = require('../Model/customer_email_address');
const Email = require('../Model/email_address');
const BVN = require('../Model/customer_bvn');

const model = sequelize.define('user_account', modelMeta);
model.belongsTo(customer,{onDelete:'cascade'});

customer.belongsToMany(phoneNumber,{through:CPhoneNumber,onDelete:'cascade'});
phoneNumber.belongsToMany(customer,{through:CPhoneNumber,onDelete:'cascade'});

customer.belongsToMany(Email,{through:CEmail,onDelete:'cascade'});
Email.belongsToMany(customer,{through:CEmail,onDelete:'cascade'});

BVN.belongsTo(customer,{onDelete:'cascade'});
customer.hasOne(BVN,{onDelete:'cascade'});

customer.sync({force:false });

BVN.sync({force:false});
model.sync({
    force: false
});
CEmail.sync({
    force: false
});
Email.sync({
    force: false
});

module.exports = model;