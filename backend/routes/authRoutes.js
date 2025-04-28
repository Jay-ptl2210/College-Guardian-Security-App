const express = require('express');
const router = express.Router();

const { 
    registerAdmin, 
    loginAdmin, 
    registerStudent, 
    loginStudent, 
    sendOTP, 
    resetPassword 
} = require('../controllers/authController');

// Admin Routes
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);

// Student Routes
router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);

// OTP Routes
router.post('/send-otp', sendOTP);
router.post('/reset-password', resetPassword);

module.exports = router;
