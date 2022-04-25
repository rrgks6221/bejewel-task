'use strict';

const _ = require('lodash');
const crypto = require('crypto');
const pool = require('../../config/db');

const ProductStorage = require('../models/Product/ProductStorage');

module.exports = async (req, res, next) => {
  const conn = await pool.getConnection();

  try {
    if (!req.files.image) {
      return res
        .status(400)
        .json({ success: false, msg: '저장할 이미지가 존재하지 않습니다.' });
    }

    const { brandId } = req.params;
    const { productId } = req.params;

    const brand = await ProductStorage.findOneByProductId(
      conn,
      productId,
      brandId
    );

    if (!brand.length) {
      return res
        .status(404)
        .json({ success: false, msg: '존재하지 않는 상품입니다.' });
    }

    const imagePaths = [];

    _.forEach(_.keysIn(req.files.image), (key) => {
      const image = req.files.image[key];
      const randomString = crypto.randomBytes(5).toString('hex');
      const imagePath = `${brandId}/${productId}/${
        randomString + encodeURI(image.name)
      }`;

      image.mv('./images/' + imagePath, image.data);

      imagePaths.push('/images/' + imagePath);
    });

    req.body.images = imagePaths;

    return next();
  } catch (err) {
    return res
      .status(500)
      .json('서버 에러입니다. 서버 개발자에게 문의해주세요');
  } finally {
    conn.release();
  }
};
