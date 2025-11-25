const express = require('express');
const router = express.Router();
const { Category, Ad } = require('../models');

// create category
router.post('/categories', async (req, res) => {
  const { name } = req.body;
  const cat = await Category.create({ name });
  res.json(cat);
});

// add ad
router.post('/ads', async (req, res) => {
  const ad = await Ad.create(req.body);
  res.json(ad);
});

// basic analytics endpoints (counts)
const { AnalyticsVisit } = require('../models');
router.get('/analytics/visits', async (req, res) => {
  const count = await AnalyticsVisit.count();
  res.json({ visits: count });
});

module.exports = router;