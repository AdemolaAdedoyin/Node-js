'use strict';

const express = require('express');
const router = express.Router();
const Controller = require("../Controller/other_namesController");

router.post('/', Controller.create);
router.get('/', Controller.findAll);

router.get('/:id', Controller.findOne);

router.put('/:id', Controller.updateOne);
router.delete('/:id', Controller.deleteOne);


module.exports = router;
