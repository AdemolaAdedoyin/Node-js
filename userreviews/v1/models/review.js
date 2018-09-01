'use strict';

const Sequelize = require('../Config/sequelizeConn');
const sequelize = require('sequelize');
const modelMeta = require('../modelMeta/review');


const model = Sequelize.define('review', modelMeta);
const customer = require('../models/customer');
const feedback = require('../models/feedback');
const review_document = require('../models/review_document');
const services = require('../models/services');
const subject = require('../models/subject');
const subjectReview = require('../models/subjectReview');
const subjectType = require('../models/subjectType');
const improvement_areas = require('../models/improvement_areas');


//model.belongsTo(customer);
//customer.hasMany(model, {onDelete: 'cascade'});

customer.hasMany(feedback, {onDelete: 'cascade'});
feedback.belongsTo(customer);


model.hasMany(review_document , {onDelete: 'cascade'});
review_document.belongsTo(model);

model.hasOne(services , {onDelete: 'cascade'});
services.belongsTo(model);

model.hasMany(feedback , {onDelete: 'cascade'});
feedback.belongsTo(model);

model.hasMany(subjectReview , {onDelete: 'cascade'});
subjectReview.belongsTo(model);
subjectReview.belongsTo(subject);
subject.hasMany(subjectReview , {onDelete: 'cascade'});

subjectReview.belongsTo(subjectType);
subjectType.hasMany(subjectReview , {onDelete: 'cascade'});

model.hasMany(improvement_areas, {onDelete: 'cascade'});
improvement_areas.belongsTo(model);

model.sync({force: false});
review_document.sync({force: false});
customer.sync({force: false});
services.sync({force: false});
improvement_areas.sync({force:false});



module.exports = model;