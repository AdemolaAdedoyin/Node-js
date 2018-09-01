'use strict';

const express = require('express');
const router = express();

const Controller = require('../../controllers/News/news');


router.get('/', Controller.findAll);
router.post('/', Controller.create);


router.get('/:id', Controller.findOne);
// router.get('/:email/news', Controller.findByAuthor);
//
router.put('/', Controller.update);
// router.delete('/:id', Controller.deleteOne);


module.exports = router;
