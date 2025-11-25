const express = require('express');
const router = express.Router();
const { Supplier, Product, Order } = require('../models');
const { sendNotificationToAdmin } = require('../utils/notify');

// POST /api/suppliers - onboard supplier
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, acceptedTnC, metadata } = req.body;
    if (!name || !acceptedTnC) {
      return res.status(400).json({ error: 'name and acceptedTnC required' });
    }
    const supplier = await Supplier.create({ name, email, phone, address, acceptedTnC, metadata });
    // notify admin
    sendNotificationToAdmin(`New supplier onboarded: ${supplier.name}`, { supplier });
    res.json(supplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET supplier's orders/transactions
router.get('/:id/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { SupplierId: req.params.id }, include: [Product] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;