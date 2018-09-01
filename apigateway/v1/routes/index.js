"use strict";
/****
 *
 * @type {*}
 */
const express = require('express');
const router = express();


/***
 * Where the route directories are
 */
const bank_routes = require('../routes/banks/index');
const transaction_routes = require('../routes/transactions/index');
const post_routes = require('../routes/posts/index');
const acct_origination_routes = require('../routes/acctOrigination/index');
const user_review_routes = require('../routes/userReviews/index');
const customer_routes = require('../routes/customers/index');


/*****
 * where we use the route directories
 */
router.use('/banks', bank_routes);
router.use('/transactions', transaction_routes);
router.use('/user-reviews', user_review_routes);
router.use('/posts',post_routes);
router.use('/acct-origination', acct_origination_routes);
router.use('/customers', customer_routes);


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.use('/auth', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

module.exports = router;
