'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    customerId: {
        type: sequelize.INTEGER,
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    },
    phoneNumberId: {
        type: sequelize.INTEGER,
        references: {
            model: "phone_numbers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    },
    isPrimary: {
        type: sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
    }
};

module.exports = modelMeta;

