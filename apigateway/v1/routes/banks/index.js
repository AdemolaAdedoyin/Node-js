"use strict";
const express = require('express');
const router = express();
const request = require('../../helpers/APICall');

const institutions = require('./institutions');
const products = require('./products');

router.use('/', institutions);
router.use('/products', products);


module.exports = router;
