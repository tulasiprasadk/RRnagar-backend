const express = require('express');
const router = express.Router();

const supplierRoutes = require('./suppliers');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const adminRoutes = require('./admin');
const categoryRoutes = require('./categories');
const adsRoutes = require('./ads');   // ⭐️ ADD THIS

router.use('/suppliers', supplierRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);
router.use('/categories', categoryRoutes);
router.use('/products/ads', adsRoutes);  // ⭐️ ADD THIS

module.exports = router;
