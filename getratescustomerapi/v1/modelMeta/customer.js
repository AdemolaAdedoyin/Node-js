'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    last_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    account_created_where: {
        type: sequelize.TEXT,
        allowNull: false
    }
};

module.exports = modelMeta;

