'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/subjectReview');


const model = Sequelize.define('subject_review', modelMeta);

model.sync({force: false});

module.exports = model;