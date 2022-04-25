'use strict';

const express = require('express');

const router = express.Router();

router.get('/:brandId/:productId/:imagePath', (req, res) => {
  res
    .status(200)
    .sendFile(
      `/Users/PC/Desktop/bejewel/bejewel-task/app/images/${
        req.params.brandId
      }/${req.params.productId}/${encodeURI(req.params.imagePath)}`
    );
});

module.exports = router;
