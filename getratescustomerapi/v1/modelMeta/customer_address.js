'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    customer_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    },
    street_address: {
        type: sequelize.STRING,
        allowNull: false
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    state: {
        type: sequelize.STRING,
        allowNull: false
    },
    country: {
        type: sequelize.STRING,
        allowNull: false
    }
};

module.exports = modelMeta;

