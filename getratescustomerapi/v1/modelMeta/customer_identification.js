'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    customerId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    },
    id_reference: {
        type: sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Sorry the id reference has been used'
        }
    },
    identificationTypesId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "identification_types",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    }
};

module.exports = modelMeta;

