'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    bvn: {
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: 'Sorry the bvn has been taken'
        },
        allowNull: false
    },
    customerId: {
        type: sequelize.INTEGER,
       
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    }
};

module.exports = modelMeta;

