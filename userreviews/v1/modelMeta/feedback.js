'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    like_value: {
        type: sequelize.STRING.BINARY,
        allowNull: false
    },
    reviewId: {
        type: sequelize.INTEGER,
        references: {
            model: 'reviews',
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        },
        allowNull: false
    },
    customerEmail: {
        type: sequelize.STRING,
        references: {
            model: 'customers',
            key: 'email',
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        },
        allowNull: false
    }
};

module.exports = modelMeta;