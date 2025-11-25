const express = require('express');
const router = express.Router();
const { Product, Supplier, Category, Ad, AnalyticsVisit } = require('../models');

// GET /api/products?query=...
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || '';
    const where = q ? { title: { [require('sequelize').Op.like]: `%${q}%` } } : {};
    const products = await Product.findAll({ where, include: [Supplier, Category] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: [Supplier, Category] });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ads
router.get('/ads/all', async (req, res) => {
  const ads = await Ad.findAll({ where: { active: true }, order: [['order', 'ASC']] });
  res.json(ads);
});

// analytics: record visit
router.post('/visit', async (req, res) => {
  try {
    await AnalyticsVisit.create({
      path: req.body.path,
      referrer: req.body.referrer || '',
      ip: req.ip,
      userAgent: req.get('User-Agent') || ''
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
});

module.exports = router;