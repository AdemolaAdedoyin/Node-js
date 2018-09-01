"use strict";
const express = require('express');
const router = express();
const request = require('../../helpers/APICall');
const Controller = require('../../controllers/bankAPI/productsController');

router.post('/',  Controller.create);
router.get('/', Controller.findAll);
router.get('/find',  Controller.findOne);
router.put('/', Controller.update);
// router.delete('/delete', Controller.deleteOne);


module.exports = router;
