'use strict';

const Product = require('../../models/Product/Product');

const processCtrl = require('../../util/processCtrl');

const process = {
  createProduct: async (req, res) => {
    const product = new Product(req);

    const response = await product.createProduct();

    return processCtrl(res, response);
  },

  createProductImage: async (req, res) => {
    const product = new Product(req);

    const response = await product.createProductImage();

    return processCtrl(res, response);
  },
};

module.exports = process;