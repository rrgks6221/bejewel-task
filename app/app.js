'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

app.use(express.json());
app.use(fileUpload({ createParentPath: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const brand = require('./src/apis/brand');
const product = require('./src/apis/product');
const images = require('./src/apis/images');

app.use('/images', images);
app.use('/api/product', product);
app.use('/api/brand', brand);

module.exports = app;
