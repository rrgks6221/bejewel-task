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
      material: this.body.material,
      color: this.body.color,
      patten: this.body.patten,
      shape: this.body.shape,
      size: this.body.size,
      weight: this.body.weight,
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

      const productId = await ProductStorage.createBasicProduct(
        conn,
        brandId,
        productBasicInfo
      );

      if (!productId) {
        return makeResponse(400, '값의 형식이 잘못되었습니다.');
      }

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
