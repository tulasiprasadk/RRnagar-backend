const express = require('express');
const router = express.Router();
const { Order, Product, Supplier } = require('../models');
const uuid = require('uuid').v4;
const { sendNotificationToSupplier, sendNotificationToCustomer } = require('../utils/notify');

const PLATFORM_FEE = parseFloat(process.env.PLATFORM_FEE_PERCENT || '15');

// Create order
router.post('/', async (req, res) => {
  try {
    const { productId, customerName, customerPhone, customerAddress, type } = req.body;
    const product = await Product.findByPk(productId, { include: [Supplier] });

    if (!product) return res.status(404).json({ error: 'product not found' });

    const totalAmount = parseFloat(product.price);
    const platformFee = +(totalAmount * PLATFORM_FEE / 100).toFixed(2);
    const payable = +(totalAmount).toFixed(2);

    const orderRef = uuid();
    const order = await Order.create({
      customerName,
      customerPhone,
      customerAddress,
      type,
      totalAmount: payable,
      platformFee,
      status: 'created',
      SupplierId: product.SupplierId,
      ProductId: product.id,
      paymentInfo: { orderRef }
    });

    // Return simple UPI payment QR (no Razorpay)
    const upiQr = `upi://pay?pa=rrnagar@upi&pn=RRNagar&am=${payable}&tn=Order%20${order.id}`;
    res.json({ order, upiQr });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Placeholder webhook (no Razorpay)
router.post('/webhook/razorpay', async (req, res) => {
  res.json({ ok: true });
});

// Mark delivered & notify
router.post('/:id/deliver', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Product, Supplier] });
    
    if (!order) return res.status(404).json({ error: 'not found' });

    order.status = 'delivered';
    await order.save();

    sendNotificationToSupplier(order.SupplierId, `Order ${order.id} delivered`, { order });
    sendNotificationToCustomer(order.customerPhone, `Your order ${order.id} is delivered. Please rate: https://rrnagar.com/rate/${order.id}`);

    res.json({ ok: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
