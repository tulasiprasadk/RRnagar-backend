// backend/routes/suppliers.js

const express = require('express');
const router = express.Router();
const { Supplier, Product, Order } = require('../models');
const { sendNotificationToAdmin } = require('../utils/notify');

/* ============================================================
   SUPPLIER LOGIN
   POST /api/suppliers/login
============================================================ */
router.post('/login', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number required" });
    }

    const supplier = await Supplier.findOne({ where: { phone } });

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    // In future we add OTP verification
    res.json({ ok: true, supplier });

  } catch (err) {
    console.error("Supplier login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================
   ONBOARD SUPPLIER
   POST /api/suppliers
============================================================ */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, acceptedTnC, metadata } = req.body;

    if (!name || !acceptedTnC) {
      return res.status(400).json({ error: 'name and acceptedTnC required' });
    }

    const supplier = await Supplier.create({
      name,
      email,
      phone,
      address,
      acceptedTnC,
      metadata
    });

    // Notify admin
    try {
      sendNotificationToAdmin(
        `New supplier onboarded: ${supplier.name}`,
        { supplier }
      );
    } catch (notifyErr) {
      console.warn("Admin notification failed:", notifyErr);
    }

    res.json(supplier);

  } catch (err) {
    console.error("Supplier onboarding error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================
   GET SUPPLIER'S PRODUCTS
   GET /api/suppliers/:id/products
============================================================ */
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { SupplierId: req.params.id },
      order: [['id', 'DESC']]
    });

    res.json(products);

  } catch (err) {
    console.error("Supplier products error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================
   GET SUPPLIER'S ORDERS
   GET /api/suppliers/:id/orders
============================================================ */
router.get('/:id/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { SupplierId: req.params.id },
      include: [Product],
      order: [['id', 'DESC']]
    });

    res.json(orders);

  } catch (err) {
    console.error("Supplier orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
