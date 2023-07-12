const Product = require('../models/product');

// Create new product => /api/v1/product/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        status: true,
        product
    })
}

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'This route will show all products in database'
    })
}