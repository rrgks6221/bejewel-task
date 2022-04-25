'use strict';

const express = require('express');

const router = express.Router();

const imageSave = require('../../midlleWares/imageSave');

const ctrl = require('./brand.ctrl');

router.get('/:brandId', ctrl.findAllProductByBrand);

router.post('/:brandId/product', ctrl.createProduct);
router.post('/:brandId/product/:productId', imageSave, ctrl.createProductImage);

router.put('/:brandId/product/:productId', ctrl.updateProductById);

module.exports = router;
