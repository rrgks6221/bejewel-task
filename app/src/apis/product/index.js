'use strict';

const express = require('express');

const router = express.Router();

const ctrl = require('./product.ctrl');

router.get('/', ctrl.findAllProductByCategory);
router.get('/:productId', ctrl.findOneProductById);

module.exports = router;
