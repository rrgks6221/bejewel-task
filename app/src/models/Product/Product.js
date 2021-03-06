'use strict';

const createError = require('http-errors');

const pool = require('../../../config/db');

const ProductStorage = require('./ProductStorage');
const BrandStorage = require('../../models/Brand/BrandStorage');
const ProductModule = require('./ProductModule');
const Error = require('../../util/Error');

const makeResponse = require('../../util/makeResponse');
const validation = require('../../util/validation');

class Product {
  constructor(req) {
    this.req = req;
    this.params = req.params;
    this.query = req.query;
    this.body = req.body;
  }

  async findAllProductByCategory() {
    const conn = await pool.getConnection();

    try {
      const products = await ProductStorage.findAllProductByCategory(
        conn,
        this.query.category
      );

      return makeResponse(200, '카테고리별 상품 조회', { products });
    } catch (err) {
      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async findAllProductByBrand() {
    const conn = await pool.getConnection();

    try {
      const products = await ProductStorage.findAllProductByBrand(
        conn,
        this.params.brandId,
        this.query.category
      );

      return makeResponse(200, '브랜드 카테고리별 상품 조회', { products });
    } catch (err) {
      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async findOneProductById() {
    const conn = await pool.getConnection();

    const productId = this.params.productId;

    try {
      const product = await ProductStorage.findOneProductBasicById(
        conn,
        productId
      );

      if (!product) {
        return makeResponse(404, '해당 상품이 존재하지 않습니다.');
      }

      const productMoreInfo = await ProductStorage.findOneProductMoreInfoById(
        conn,
        productId
      );

      for (const moreInfo in productMoreInfo) {
        product[moreInfo] = productMoreInfo[moreInfo] || '';
      }

      product.options = await ProductStorage.findOneProductOptionById(
        conn,
        productId
      );

      const categories = await ProductStorage.findAllCategoryById(
        conn,
        productId
      );

      product.categories = categories.map((category) => category.category);

      const images = await ProductStorage.findAllImageById(conn, productId);

      product.images = images.map((image) => image.path);

      return makeResponse(200, '상품 상세 조회', { product });
    } catch (err) {
      console.log(err);
      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async createProduct() {
    const conn = await pool.getConnection();

    const { brandId } = this.params;
    const productBasicInfo = {
      name: this.body.name,
      description: this.body.description,
      price: this.body.price,
      shippingFee: this.body.shippingFee || 0,
      discountRate: this.body.discountRate || 0,
    };
    const productMoreInfo = {
      material: this.body.material && String(this.body.material),
      color: this.body.color && String(this.body.color),
      patten: this.body.patten && String(this.body.patten),
      shape: this.body.shape && String(this.body.shape),
      size: this.body.size && String(this.body.size),
      weight: this.body.weight && String(this.body.weight),
    };

    const isValidation = validation(
      ['name', 'description', 'price'],
      this.body
    );

    if (!isValidation.success) {
      return makeResponse(
        400,
        `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
      );
    }

    try {
      await conn.beginTransaction();

      const brand = await BrandStorage.findOneByBrandId(conn, brandId);

      if (!brand.length) {
        return makeResponse(404, '존재하지 않는 브랜드입니다.');
      }

      const productId = await ProductStorage.createProductBasic(
        conn,
        brandId,
        productBasicInfo
      );

      if (!productId) {
        await conn.rollback();

        return makeResponse(400, '타입 오류로 상품 등록에 실패했습니다.');
      }

      const isCreateAdd = await ProductStorage.createProductAdd(
        conn,
        productId,
        productMoreInfo
      );

      if (!isCreateAdd) {
        await conn.rollback();

        return makeResponse(400, '타입 오류로 상품 등록에 실패했습니다.');
      }

      const presentCategories = await ProductStorage.findAllProductCategory(
        conn
      );

      const notExistCategories = ProductModule.getNotExistCategories(
        presentCategories,
        this.body.categories
      );

      if (notExistCategories.length) {
        await conn.rollback();

        return makeResponse(
          400,
          `${notExistCategories}은(는) 존재하지 않는 카테고리번호 입니다.`
        );
      }

      const toSaveCategories = ProductModule.getToSaveCategories(
        productId,
        this.body.categories
      );

      if (toSaveCategories.length) {
        const isCreateCategory = await ProductStorage.createProductCategory(
          conn,
          toSaveCategories
        );

        if (isCreateCategory !== toSaveCategories.length) {
          await conn.rollback();

          throw createError(502, 'Bad GateWay');
        }
      }

      const toSaveOptions = ProductModule.getToSaveOptions(
        productId,
        this.body.options
      );

      if (toSaveOptions.length) {
        const isCreateOption = await ProductStorage.createProductOption(
          conn,
          toSaveOptions
        );

        if (isCreateOption !== toSaveOptions.length) {
          await conn.rollback();

          throw createError(502, 'Bad GateWay');
        }
      }

      await conn.commit();

      return makeResponse(201, '상품 등록에 성공했습니다.', { productId });
    } catch (err) {
      console.log(err);

      await conn.rollback();

      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async createProductImage() {
    const conn = await pool.getConnection();

    try {
      const images = ProductModule.getToSaveImages(
        this.params.productId,
        this.body.images
      );

      const isCreate = await ProductStorage.createProductImages(conn, images);

      if (isCreate !== images.length) {
        throw createError(502, 'Bad GateWay');
      }
      return makeResponse(201, '이미지 저장에 성공했습니다.');
    } catch (err) {
      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async updateProductById() {
    const conn = await pool.getConnection();

    const { brandId } = this.params;
    const { productId } = this.params;
    const productBasicInfo = {
      name: this.body.name,
      description: this.body.description,
      price: this.body.price,
      shippingFee: this.body.shippingFee || 0,
      discountRate: this.body.discountRate || 0,
    };
    const productMoreInfo = {
      material: this.body.material && String(this.body.material),
      color: this.body.color && String(this.body.color),
      patten: this.body.patten && String(this.body.patten),
      shape: this.body.shape && String(this.body.shape),
      size: this.body.size && String(this.body.size),
      weight: this.body.weight && String(this.body.weight),
    };

    const isValidation = validation(
      ['name', 'description', 'price'],
      this.body
    );

    if (!isValidation.success) {
      return makeResponse(
        400,
        `${isValidation.emptyKey}은(는) 필수로 입력해야 합니다.`
      );
    }

    try {
      await conn.beginTransaction();

      const product = await ProductStorage.findOneByProductId(
        conn,
        productId,
        brandId
      );

      if (!product.length) {
        return makeResponse(404, '해당 상품이 존재하지 않습니다.');
      }

      const isUpdateBasic = await ProductStorage.updateProductBasicById(
        conn,
        productId,
        productBasicInfo
      );

      if (!isUpdateBasic) {
        await conn.rollback();

        return makeResponse(400, '타입 오류로 상품 수정에 실패했습니다.');
      }

      const isCreateAdd = await ProductStorage.updateProductAddById(
        conn,
        productId,
        productMoreInfo
      );

      if (!isCreateAdd) {
        await conn.rollback();

        return makeResponse(400, '타입 오류로 상품 수정에 실패했습니다.');
      }

      const isDeleteCategory = await ProductStorage.deleteProductCategoryById(
        conn,
        productId
      );

      if (!isDeleteCategory) {
        await conn.rollback();

        throw createError(502, 'Bad GateWay');
      }

      const toSaveCategories = ProductModule.getToSaveCategories(
        productId,
        this.body.categories
      );

      if (toSaveCategories.length) {
        const isCreateCategory = await ProductStorage.createProductCategory(
          conn,
          toSaveCategories
        );

        if (isCreateCategory !== toSaveCategories.length) {
          await conn.rollback();

          throw createError(502, 'Bad GateWay');
        }
      }

      const isDeleteOption = await ProductStorage.deleteProductOptionById(
        conn,
        productId
      );

      if (!isDeleteOption) {
        await conn.rollback();

        throw createError(502, 'Bad GateWay');
      }

      const toSaveOptions = ProductModule.getToSaveOptions(
        productId,
        this.body.options
      );

      if (toSaveOptions.length) {
        const isCreateOption = await ProductStorage.createProductOption(
          conn,
          toSaveOptions
        );

        if (isCreateOption !== toSaveOptions.length) {
          await conn.rollback();

          throw createError(502, 'Bad GateWay');
        }
      }

      await conn.commit();

      return makeResponse(200, '상품 정보를 수정하였습니다.');
    } catch (err) {
      console.log(err);

      await conn.rollback();

      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async deleteProductImageById() {
    const conn = await pool.getConnection();

    try {
      const images = ProductModule.getToSaveImages(
        this.params.productId,
        this.body.images
      );

      const isDelete = ProductStorage.deleteProductImageById(
        conn,
        this.params.productId
      );

      if (!isDelete) {
        throw createError(502, 'Bad GateWay');
      }

      const isCreate = await ProductStorage.createProductImages(conn, images);

      if (isCreate !== images.length) {
        throw createError(502, 'Bad GateWay');
      }
      return makeResponse(201, '이미지 수정에 성공했습니다.');
    } catch (err) {
      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }

  async deleteProductById() {
    const conn = await pool.getConnection();

    const { brandId } = this.params;
    const { productId } = this.params;

    try {
      const product = await ProductStorage.findOneByProductId(
        conn,
        productId,
        brandId
      );

      if (!product.length) {
        return makeResponse(404, '해당 상품이 존재하지 않습니다.');
      }

      const isDelete = await ProductStorage.deleteProductById(conn, productId);

      if (!isDelete) {
        throw createError(502, 'Bad GateWay');
      }

      return makeResponse(200, '상품 삭제에 성공했습니다.');
    } catch (err) {
      return Error.ctrl(err);
    } finally {
      conn.release();
    }
  }
}

module.exports = Product;
