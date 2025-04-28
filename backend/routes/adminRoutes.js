const express = require('express');
const router = express.Router();
const { 
    getAlerts,
    getAllStudents,
    getAllRequests,
    closeRequest,
    closeSOS,
    addCollege,
    getAllColleges
} = require('../controllers/adminController');

const { isAdmin } = require('../middlewares/authMiddleware');

// SOS Alerts
router.get('/alerts', isAdmin, getAlerts);

// Students Management
router.get('/students', isAdmin, getAllStudents);

// Requests Management
router.get('/requests', isAdmin, getAllRequests);
router.put('/requests/:requestId/close', isAdmin, closeRequest);

// SOS Complaint Management
router.put('/sos/:sosId/close', isAdmin, closeSOS);

// Colleges Management
router.post('/colleges', isAdmin, addCollege);
router.get('/colleges', getAllColleges); // No auth needed for students registering

module.exports = router;
