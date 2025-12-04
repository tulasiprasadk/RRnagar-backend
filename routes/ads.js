// backend/routes/ads.js
const express = require("express");
const router = express.Router();
const { Ad } = require("../models");

// GET all ads
router.get("/all", async (req, res) => {
  try {
    const ads = await Ad.findAll({
      where: { active: true },
      order: [["order", "ASC"]],
    });
    res.json(ads);
  } catch (err) {
    console.error("Ads fetch error:", err);
    res.status(500).json({ error: "Server error fetching ads" });
  }
});

// CREATE ad
router.post("/", async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
