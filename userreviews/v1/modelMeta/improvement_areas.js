'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    improvement_areas: {
        type: sequelize.STRING,
        allowNull: false
    }
};

module.exports = modelMeta;