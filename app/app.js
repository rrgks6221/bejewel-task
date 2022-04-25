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

const product = require('./src/apis/brand');

app.use('/api/brand', product);

module.exports = app;
