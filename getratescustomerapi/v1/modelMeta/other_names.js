'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    other_names: {
        type: sequelize.STRING,
        allowNull: false
    },
    customerId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    }
};

module.exports = modelMeta;

