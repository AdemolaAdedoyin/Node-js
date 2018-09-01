'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    subject_name: {
        type: sequelize.STRING,
        validate: {
            // notNull: true
        },
        allowNull: false
    },
    subjectTypeId: {
        type: sequelize.INTEGER,
        references: {
            model: 'subject_types',
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        },
        allowNull: false
    }
};

module.exports = modelMeta;