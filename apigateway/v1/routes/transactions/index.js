"use strict";
const express = require('express');
const router = express();
const request = require('../../helpers/APICall');


router.use('/', (req, res, next) => {
    return request('GET','http://get-rates-transactions.herokuapp.com','').then(response=>{
        return res.json(response);
    });
});


module.exports = router;
