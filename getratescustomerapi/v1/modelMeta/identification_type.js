'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    identification_type: {
        type: sequelize.STRING,
        allowNull: false
    }
};

module.exports = modelMeta;

