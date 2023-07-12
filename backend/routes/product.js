const express = require('express');
const router = express.Router();

const { getProducts, newPeoduct } = require('../controllers/productController');

router.route('/products').get(getProducts);

router.route('/product/new').post(newPeoduct);

module.exports = router;