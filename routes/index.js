const express = require('express');
const router = express.Router();

const supplierRoutes = require('./suppliers');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const adminRoutes = require('./admin');

router.use('/suppliers', supplierRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
