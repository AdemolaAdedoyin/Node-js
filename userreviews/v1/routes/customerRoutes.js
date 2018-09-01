'use strict';

const express = require('express');
const router = express.Router();

const Controller = require('../controllers/customerController');





router.get('/', Controller.findAll);
router.post('/', Controller.create);


router.get('/:id', Controller.findOne);
router.get('/:attr/:value' , Controller.findWhere);

router.put('/:id', Controller.updateOne);
router.delete('/:id', Controller.deleteOne);


module.exports = router;
