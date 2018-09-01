'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    social_media_name: {
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: 'Sorry the name has been taken'
        },
        allowNull: false
    }
};

module.exports = modelMeta;

