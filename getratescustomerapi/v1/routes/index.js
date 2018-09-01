'use strict';

const express = require('express');
const router = express.Router();

const email_addressRoute = require("./email_addressRoutes");
const customerRoute = require("./customerRoutes");
const user_accountRoute = require("./user_accountRoutes");
const customer_email_addressRoute = require("./customer_email_addressRoutes");
const phone_numberRoute = require("./phone_numberRoutes");
const customer_phone_numberRoute = require("./customer_phone_numberRoutes");
const customer_bvnRoute = require("./customer_bvnRoutes");
const customer_social_mediaRoute = require("./customer_social_mediaRoutes");
const social_media_platformRoute = require("./social_media_platformRoutes");

const other_namesRoute = require("./other_namesRoutes");
const customer_addressRoute = require("./customer_addressRoutes");

const customer_identificationRoutes = require("./customer_identificationRoutes");
const identification_typesRoutes = require("./identificationRoutes");

const jwt = require('jsonwebtoken');
const secret_key = "diagnosed with real nigga conditions";


/* GET home page. */
router.get('/', function (req, res, next) {
    res.json("Hello, I work");
});
router.use('/customer-accounts', user_accountRoute);

//router.use((req, res, next) => {
//
//    try {
//        let token = req.headers.token;
//        jwt.decode(token, secret_key);
//        console.log(token);
//        next();
//    } catch (err) {
//        var error = new Error(err);
//        error.status = 400;
//        next(err);
//
//    }
//});


router.use('/emails', email_addressRoute);
router.use('/customers', customerRoute);

router.use('/customer-emails', customer_email_addressRoute);
router.use('/phone-numbers', phone_numberRoute);
router.use('/customer-phone-numbers', customer_phone_numberRoute);
router.use('/customer-bvns', customer_bvnRoute);
router.use('/customer-social-media', customer_social_mediaRoute);
router.use('/social-media-platforms', social_media_platformRoute);

router.use('/other-names', other_namesRoute);
router.use('/customer-addresses', customer_addressRoute);

router.use('/customer-identification', customer_identificationRoutes);
router.use('/identification-types', identification_typesRoutes);





module.exports = router;
