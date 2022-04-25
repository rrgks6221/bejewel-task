'use strict';

const createError = require('http-errors');

class BrandStorage {
  static async findOneByBrandId(conn, brandId) {
    try {
      const query = `
        SELECT * FROM brands
        WHERE id = ?;`;

      const brand = await conn.query(query, [brandId]);

      return brand[0];
    } catch (err) {
      throw createError(500, err);
    }
  }
}

module.exports = BrandStorage;
