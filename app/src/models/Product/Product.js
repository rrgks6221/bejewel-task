'use strict';

const pool = require('../../../config/db');

const ProductStorage = require('./ProductStorage');
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
      material: this.body.material.join(' '),
      color: this.body.color.join(' '),
      patten: this.body.patten.join(' '),
      shape: this.body.shape.join(' '),
      size: this.body.size.join(' '),
      weight: this.body.weight.join(' '),
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

      await conn.commit();

      return brand;
    } catch (err) {
      console.log(err);

      await conn.rollback();

      return Error.ctrl(
        500,
        err,
        '서버 에러입니다. 서버 개발자에게 문의해주세요.'
      );
    } finally {
      conn.release();
    }
  }
}

module.exports = Product;