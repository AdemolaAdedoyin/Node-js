'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    subject_type: {
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: "Sorry, looks like that a subject type with that name has \n\
                already been created"
        },
        allowNull: false
    }
};

module.exports = modelMeta;