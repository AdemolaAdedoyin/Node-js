'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    service_name:{
        type:sequelize.STRING,
        allowNull:false

    }
};

module.exports = modelMeta;