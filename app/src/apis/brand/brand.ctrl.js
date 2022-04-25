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

  findAllProductByBrand: async (req, res) => {
    const product = new Product(req);

    const response = await product.findAllProductByBrand();

    return processCtrl(res, response);
  },

  updateProductById: async (req, res) => {
    const product = new Product(req);

    const response = await product.updateProductById();

    return processCtrl(res, response);
  },

  deleteProductImageById: async (req, res) => {
    const product = new Product(req);

    const response = await product.deleteProductImageById();

    return processCtrl(res, response);
  },
};

module.exports = process;
