const express = require('express');
const router = express.Router();
const productController = require('./controller/products');

router.get('/', productController.hello);

module.exports = router;