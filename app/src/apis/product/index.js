'use strict';

const express = require('express');

const router = express.Router();

const ctrl = require('./product.ctrl');

router.get('/', ctrl.findAllProduct);

module.exports = router;
