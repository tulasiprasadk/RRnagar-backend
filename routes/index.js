const express = require('express');
const router = express.Router();

// Import individual route groups
const categories = require('./categories');
const products = require('./products');
const ads = require('./ads');
const suppliers = require('./suppliers');
const orders = require('./orders');
const analytics = require('./analytics');
const stock = require('./stock');
const shops = require('./shops');

// Route mappings
router.use('/categories', categories);
router.use('/products', products);
router.use('/ads', ads);
router.use('/suppliers', suppliers);
router.use('/orders', orders);
router.use('/analytics', analytics);
router.use('/stock', stock);
router.use('/shops', shops);

module.exports = router;
