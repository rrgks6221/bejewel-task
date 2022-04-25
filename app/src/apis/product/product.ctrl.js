'use strict';

const Product = require('../../models/Product/Product');

const processCtrl = require('../../util/processCtrl');

const process = {
  findAllProductByCategory: async (req, res) => {
    const product = new Product(req);

    const response = await product.findAllProductByCategory();

    return processCtrl(res, response);
  },
};

module.exports = process;
