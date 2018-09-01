'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    rating: {
        type: sequelize.INTEGER,
        validate: {
            // notNull: true,
            min: 1,
            max: 5
        },
        allowNull: false
    },
    review: {
        type: sequelize.TEXT,
        allowNull: false
    },
    customerEmail: {
        type: sequelize.STRING,
        // references: {
        //     model: 'customers',
        //     key: 'email',
        //     deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        // },
        allowNull: false
    },
    institution_name: {
        type: sequelize.STRING,
        allowNull: false
    }
    ,
    review_type: {
        type: sequelize.ENUM('SERVICES', 'INSTITUTIONS'),
        allowNull: false,
        defaultValue: "INSTITUTIONS",
        set(val)
        {
            this.setDataValue('review_type', val.toUpperCase());
        }
    }
};

module.exports = modelMeta;