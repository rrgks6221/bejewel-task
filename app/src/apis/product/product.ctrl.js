'use strict';

const Product = require('../../models/Product/Product');

const processCtrl = require('../../util/processCtrl');

const process = {
  findAllProduct: async (req, res) => {
    const product = new Product(req);

    const response = await product.findAllProduct();

    return processCtrl(res, response);
  },
};

module.exports = process;
