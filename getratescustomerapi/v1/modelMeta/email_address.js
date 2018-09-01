'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    email_address: {
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: 'Sorry invalid email'
        },
        allowNull: false
    }
};

module.exports = modelMeta;

