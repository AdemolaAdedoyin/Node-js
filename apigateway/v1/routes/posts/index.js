'use strict';

const express = require('express');
const router = express();

//Routes
const newsRoutes = require('./news');

//Use Routes
router.use('/',newsRoutes);



module.exports = router;
