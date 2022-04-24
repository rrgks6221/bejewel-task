'use strict';

const Product = require('../../models/Product/Product');

const process = {
  createProduct: async (req, res) => {
    const product = new Product(req);

    const response = await product.createProduct();

    return res.status(200).json(response);
  },
};

module.exports = process;
