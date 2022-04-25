'use strict';

const Product = require('../../models/Product/Product');

const process = {
  createProduct: async (req, res) => {
    const product = new Product(req);

    const response = await product.createProduct();

    if (response.status < 400) {
      return res.status(response.status).json(response);
    }
    if (response.status < 500) {
      return res.status(response.status).json(response);
    }

    delete response.err;

    return res.status(response.status).json(response);
  },

  createProductImage: async (req, res) => {
    const product = new Product(req);

    const response = await product.createProductImage();

    if (response.status < 400) {
      return res.status(response.status).json(response);
    }
    if (response.status < 500) {
      return res.status(response.status).json(response);
    }

    delete response.err;

    return res.status(response.status).json(response);
  },
};

module.exports = process;
