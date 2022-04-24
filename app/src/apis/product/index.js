'use strict';

const express = require('express');

const router = express.Router();

const ctrl = require('./product.ctrl');

router.post('/:brandId/product', ctrl.createProduct);

module.exports = router;
