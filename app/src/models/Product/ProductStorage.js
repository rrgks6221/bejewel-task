'use strict';

const createError = require('http-errors');

class ProductStorage {
  static async findOneByProductId(conn, productId, brandId) {
    try {
      const query = `
        SELECT * FROM products
        WHERE id = ? AND brand_id = ?;`;

      const brand = await conn.query(query, [productId, brandId]);

      return brand[0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async findAllProductCategory(conn) {
    try {
      const query = `
        SELECT id FROM product_category_list;`;

      const category = await conn.query(query);

      return category[0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async findAllProductByCategory(conn, category) {
    try {
      let query = `
        SELECT products.id, brand_id AS brandId, brands.name AS brandName, products.name, description, price, shipping_fee AS shippingFee, discount_rate AS discountRate FROM products
        JOIN brands
        ON brands.id = brand_id`;

      if (category) {
        query += `
          JOIN product_categories
          ON product_categories.product_category_list_id = ${category}
          WHERE products.id = product_categories.product_id;`;
      }

      const products = await conn.query(query);

      return products[0];
    } catch (err) {
      console.log(err);
      throw createError(500, err);
    }
  }

  static async findAllProductByBrand(conn, brandId, category) {
    try {
      let query = `
        SELECT products.id, brand_id AS brandId, brands.name AS brandName, products.name, description, price, shipping_fee AS shippingFee, discount_rate AS discountRate FROM products
        JOIN brands
        ON brands.id = brand_id`;

      if (brandId) {
        if (category) {
          query += `
            JOIN product_categories
            ON product_categories.product_category_list_id = ${category}
            WHERE products.brand_id = ${brandId} AND products.id = product_categories.product_id;`;
        } else {
          query += `
            WHERE products.brand_id = ${brandId}`;
        }
      }

      const products = await conn.query(query);

      return products[0];
    } catch (err) {
      console.log(err);
      throw createError(500, err);
    }
  }

  static async findOneProductBasicById(conn, id) {
    try {
      const query = `
        SELECT products.id, brand_id AS brandId, brands.name AS brandName, products.name, description, price, shipping_fee AS shippingFee, discount_rate AS discountRate FROM products
        JOIN brands
        ON brands.id = brand_id
        WHERE products.id = ?`;

      const product = await conn.query(query, [id]);

      return product[0][0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async findOneProductMoreInfoById(conn, id) {
    try {
      const query = `
        SELECT material, color, patten, shape, size, weight FROM product_more_informations
        WHERE product_id = ?`;

      const product = await conn.query(query, [id]);

      return product[0][0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async findOneProductOptionById(conn, id) {
    try {
      const query = `
        SELECT option_name AS optionName, add_price AS addPrice FROM product_options
        WHERE product_id = ?`;

      const option = await conn.query(query, [id]);

      return option[0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async findAllCategoryById(conn, id) {
    try {
      const query = `
        SELECT category FROM product_category_list
        JOIN product_categories
        ON product_categories.product_id = ?
        WHERE product_categories.product_category_list_id = product_category_list.id`;

      const categories = await conn.query(query, [id]);

      return categories[0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async findAllImageById(conn, id) {
    try {
      const query = `
        SELECT path FROM product_images
        WHERE product_id = ?`;

      const images = await conn.query(query, [id]);

      return images[0];
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async createProductBasic(conn, brandId, productBasicInfo) {
    try {
      const query = `
        INSERT INTO products
        (brand_id, name, description, price, shipping_fee, discount_rate)
        VALUES
        (?, ?, ?, ?, ?, ?);`;

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
      throw createError(500, err);
    }
  }

  static async createProductAdd(conn, productId, productMoreInfo) {
    try {
      const query = `
        INSERT INTO product_more_informations
        (product_id, material, color, patten, shape, size, weight)
        VALUES
        (?, ?, ?, ?, ?, ?, ?);`;

      const isCreate = await conn.query(query, [
        productId,
        productMoreInfo.material,
        productMoreInfo.color,
        productMoreInfo.patten,
        productMoreInfo.shape,
        productMoreInfo.size,
        productMoreInfo.weight,
      ]);

      if (isCreate[0].warningStatus) return 0;
      return isCreate[0].affectedRows;
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async createProductCategory(conn, categories) {
    try {
      const query = `
        INSERT INTO product_categories
        (product_id, product_category_list_id)
        VALUES
        ?;`;

      const isCreate = await conn.query(query, [categories]);

      return isCreate[0].affectedRows;
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async createProductOption(conn, options) {
    try {
      const query = `
      INSERT INTO product_options
      (product_id, option_name, add_price)
      VALUES
      ?;`;

      const isCreate = await conn.query(query, [options]);

      return isCreate[0].affectedRows;
    } catch (err) {
      throw createError(500, err);
    }
  }

  static async createProductImages(conn, images) {
    try {
      const query = `
      INSERT INTO product_images
      (product_id, path)
      VALUES
      ?;`;

      const isCreate = await conn.query(query, [images]);

      return isCreate[0].affectedRows;
    } catch (err) {
      console.log(err);
      throw createError(500, err);
    }
  }
}

module.exports = ProductStorage;
