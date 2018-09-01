'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    document_url:{
        type:sequelize.STRING,
        allowNull:false
    }
};

module.exports = modelMeta;