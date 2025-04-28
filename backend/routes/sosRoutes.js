// /routes/sosRoutes.js

const express = require('express');
const router = express.Router();
const sosController = require('../controllers/sosController');
const { protectStudent } = require('../middlewares/authMiddleware');
const { sosRateLimiter } = require('../middlewares/rateLimiter');

// Student triggers SOS
router.post('/send', protectStudent, sosRateLimiter, sosController.triggerSOS);

// Admin views all SOS complaints
router.get('/all', sosController.getAllSOS);

// Admin closes an SOS
router.put('/close/:sosId', sosController.closeSOS);

module.exports = router;
