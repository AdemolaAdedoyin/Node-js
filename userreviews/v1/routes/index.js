'use strict';

const express = require('express');
const router = express.Router();

//Routes:
const customerRoutes = require('../routes/customerRoutes');
const feedbackRoutes = require('../routes/feedbackRoutes');
const reviewRoutes = require('../routes/reviewRoutes');
const subjectReviewRoutes = require('../routes/subjectReviewRoutes');
const subjectRoutes = require('../routes/subjectRoutes');
const subjectTypeRoutes = require('../routes/subjectTypeRoutes');
const review_document = require('../routes/review_document');
const services = require('../routes/services');
const improvement_areas = require('../routes/improvement_areas');



router.use('/customers',customerRoutes);
router.use('/feedbacks',feedbackRoutes);
router.use('/reviews',reviewRoutes);
router.use('/subjects',subjectRoutes);
router.use('/subject-reviews',subjectReviewRoutes);
router.use('/subject-types',subjectTypeRoutes);
router.use('/review_document',review_document);
router.use('/services',services);
router.use('/improvement_areas',improvement_areas);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Hello, I work');
});

module.exports = router;
