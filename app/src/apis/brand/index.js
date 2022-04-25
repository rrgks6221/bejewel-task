'use strict';

const express = require('express');

const router = express.Router();

const imageSave = require('../../midlleWares/imageSave');
const imageUpdate = require('../../midlleWares/imageUpdate');

const ctrl = require('./brand.ctrl');

router.get('/:brandId', ctrl.findAllProductByBrand);

router.post('/:brandId/product', ctrl.createProduct);
router.post(
  '/:brandId/product/:productId/image',
  imageSave,
  ctrl.createProductImage
);

router.put('/:brandId/product/:productId', ctrl.updateProductById);
router.put(
  '/:brandId/product/:productId/image',
  imageUpdate,
  ctrl.deleteProductImageById
);

router.delete('/:brandId/product/:productId', ctrl.deleteProductById);

module.exports = router;
