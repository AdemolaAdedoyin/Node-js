'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    email: {
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: 'Sorry the username has been used'
        },
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    customerId: {
        type: sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    }
};

module.exports = modelMeta;

