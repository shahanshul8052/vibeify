// routes/playlistRoutes.js
console.log("🎧 playlistRoutes.js loaded");
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');


// Protected route
router.get("/", authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}, your playlists go here!` });
});
router.get("/test", (req, res) => {
    console.log("🎯 /api/playlists/test hit");

    res.json({ message: "✅ Test route hit" });
  });  
module.exports = router;