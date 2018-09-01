'use strict';

const sequelize = require('sequelize');

const modelMeta = {
    reviewId: {
        type: sequelize.INTEGER,
        references: {
            model: 'reviews',
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        },
        allowNull: false
    },
    SubjectOfReviewId: {
        type: sequelize.INTEGER,
        references: {
            model: 'subjects',
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
        },
        allowNull: false
    }
};

module.exports = modelMeta;