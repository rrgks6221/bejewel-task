'use strict';

const createError = require('http-errors');

const pool = require('../../../config/db');

const ProductStorage = require('./ProductStorage');
const ProductModule = require('./ProductModule');
const Error = require('../../../util/Error');

const makeResponse = require('../../../util/makeResponse');
const validation = require('../../../util/validation');

class Product {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
  }

  async createProduct() {
    let conn;

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
      conn = await pool.getConnection();

      await conn.beginTransaction();

      const brand = await ProductStorage.findOneByBrandId(conn, brandId);

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
}

module.exports = Product;
