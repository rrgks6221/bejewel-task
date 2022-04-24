'use strict';

class ProductStorage {
  static async findOneByBrandId(conn, brandId) {
    try {
      const query = `
        SELECT * FROM brands
        WHERE id = ?;`;

      const brand = await conn.query(query, [brandId]);

      return brand[0];
    } catch (err) {
      throw err;
    }
  }

  static async createProductBasic(conn, brandId, productBasicInfo) {
    try {
      const query = `
        INSERT INTO products
        (brand_id, name, description, price, shipping_fee, discount_rate)
        VALUES
        (?, ?, ?, ?, ?, ?)`;

      const isCreate = await conn.query(query, [
        brandId,
        productBasicInfo.name,
        productBasicInfo.description,
        productBasicInfo.price,
        productBasicInfo.shippingFee,
        productBasicInfo.discountRate,
      ]);

      if (isCreate[0].warningStatus) return 0;
      return isCreate[0].insertId;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductStorage;
