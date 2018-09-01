'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://vqfqqwalpkfwrh:4ff54b644bb4313af054a1bf9c4890c049530098744067e745bd5408d2bbf1b0@ec2-184-73-236-170.compute-1.amazonaws.com:5432/d7danu5s41neer',
        {
            host: 'ec2-184-73-236-170.compute-1.amazonaws.com',
            dialect: 'posgress',
            dialectOptions: {
                ssl: true,
                native: true
            }
        }
);

module.exports = sequelize;

