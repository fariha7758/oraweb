const express = require('express');
const router = express.Router();
const Layout = require('../models/Layout');

// Save layout
router.post('/save', async (req, res) => {
  try {
    const { layout, components } = req.body;
    const newLayout = new Layout({ layout, components });
    await newLayout.save();
    res.status(201).json(newLayout);
  } catch (error) {
    res.status(500).json({ message: 'Error saving layout' });
  }
});

// Load layout
router.get('/load', async (req, res) => {
  try {
    const layout = await Layout.findOne().sort({ _id: -1 }); // Load the latest saved layout
    res.status(200).json(layout);
  } catch (error) {
    res.status(500).json({ message: 'Error loading layout' });
  }
});

// Get predefined templates
router.get('/templates', (req, res) => {
  const templates = [
    {
      layout: [
        { i: "0", x: 0, y: 0, w: 3, h: 2 },
        { i: "1", x: 3, y: 0, w: 3, h: 2 },
      ],
      components: [
        { type: "TextComponent", data: { text: "Welcome to Our Website" }, x: 0, y: 0, w: 3, h: 2 },
        { type: "ImageComponent", data: { src: "https://via.placeholder.com/300" }, x: 3, y: 0, w: 3, h: 2 },
      ],
    },
    {
      layout: [
        { i: "0", x: 0, y: 0, w: 4, h: 2 },
        { i: "1", x: 4, y: 0, w: 2, h: 2 },
      ],
      components: [
        { type: "ButtonComponent", data: { text: "Learn More", backgroundColor: "#007BFF" }, x: 0, y: 0, w: 4, h: 2 },
        { type: "VideoComponent", data: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" }, x: 4, y: 0, w: 2, h: 2 },
      ],
    },
  ];

  res.status(200).json(templates);
});

module.exports = router;
