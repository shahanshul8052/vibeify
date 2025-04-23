// routes/playlistRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

// Protected route
router.get("/", authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}, your playlists go here!` });
});

module.exports = router;