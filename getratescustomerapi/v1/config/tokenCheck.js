'use strict';
/****
 * Author: ifeoluwa.afolabi@algorismng.com
 */

//Variable Def:
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const secret_key = "diagnosed with real nigga conditions";

module.exports = {
    
    verifyToken: (err, req, res, next) => {
        /****
         * Verify Json Web Token at this point
         */

        try {
            let token = req.headers.token;
            jwt.verify(token, secret_key);
            console.log('try')
            next();
        } catch (err) {
            var error = new Error(err);
            error.status = 400;
            console.log('catch')
            return res.send(error) ;
            //next(err);
        }

    }
};