'use strict';

const sequelize = require('sequelize');
const modelMeta = {
    user_name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Sorry the username has been used'
        }
    },
    customerId: {
        type: sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "customers",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    },
    socialMediaPlatformId: {
        type: sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "social_media_platforms",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        }
    }
};

module.exports = modelMeta;

