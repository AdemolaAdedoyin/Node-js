'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    phone_number: {
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: 'Sorry number has been used'
        },
        allowNull: false
    }
};

module.exports = modelMeta;

