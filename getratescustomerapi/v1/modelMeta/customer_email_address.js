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
    emailAddressId: {
        type: sequelize.INTEGER,
        references: {
            model: "email_addresses",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    },
    isPrimary: {
        type: sequelize.BOOLEAN,
        defaultValue:false
    }
};

module.exports = modelMeta;

