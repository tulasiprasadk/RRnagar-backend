const express = require('express');
const router = express.Router();
const { Category } = require('../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const cats = await Category.findAll({
      order: [['id', 'ASC']]
    });
    res.json(cats);
  } catch (err) {
    console.error("Category GET error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE category
router.post('/', async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.json(cat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
