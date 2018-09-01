'use strict';

const express = require('express');
const router = express.Router();
const Controller = require("../Controller/user_accountController");
const tokenCheck = require('../config/tokenCheck');
const jwt = require('jsonwebtoken');
const secret_key = "diagnosed with real nigga conditions";

router.post('/', Controller.create);

router.post('/custom-register',Controller.createOneStep);
router.post('/social-login',Controller.createSocial);
router.get('/:id', Controller.findOne);
router.post('/login', Controller.findOneAccount);

router.put('/:id', Controller.updateOne);
router.delete('/:id', Controller.deleteOne);

//router.use((req, res, next) => {
//
//    try {
//        let token = req.headers.token;
//        jwt.verify(token, secret_key);
//
//        next();
//    } catch (err) {
//        var error = new Error(err);
//        error.status = 400;
//        next(err);
//        
//    }
//});

router.get('/', Controller.findAll);

module.exports = router;
