const Admin = require('../models/Admin');
const Student = require('../models/Student');
const College = require('../models/College');
const OTP = require('../models/OTP');
const generateOTP = require('../utils/generateOTP');
const sendSMS = require('../utils/sendSMS');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// JWT Token Generator
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ===========================================
// Admin Register
// ===========================================
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, mobile, collegeName, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const admin = await Admin.create({ name, email, mobile, collegeName, password });

    // Also Create College entry
    await College.create({ name: collegeName, admin: admin._id });

    const token = generateToken(admin._id, 'admin');

    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ===========================================
// Admin Login
// ===========================================
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = generateToken(admin._id, 'admin');

    res.status(200).json({ message: 'Admin logged in', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ===========================================
// Student Register
// ===========================================
exports.registerStudent = async (req, res) => {
  try {
    const { name, enrollmentNo, mobile, email, collegeName, password } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).json({ message: 'Student already exists' });

    const college = await College.findOne({ name: collegeName });
    if (!college) return res.status(404).json({ message: 'College not found' });

    const student = await Student.create({ name, enrollmentNo, mobile, email, college: college._id, password });

    const token = generateToken(student._id, 'student');

    res.status(201).json({ message: 'Student registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ===========================================
// Student Login
// ===========================================
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await student.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = generateToken(student._id, 'student');

    res.status(200).json({ message: 'Student logged in', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ===========================================
// Send OTP for Forgot Password
// ===========================================
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Admin.findOne({ email }) || await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const otpCode = generateOTP();

    // Save OTP in DB
    await OTP.create({ email, otp: otpCode });

    // Send OTP (SMS or Email) - for now console.log
    console.log(`Sending OTP to ${email}: ${otpCode}`);
    // You can use sendSMS(email, `Your OTP is ${otpCode}`); if using SMS gateway

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ===========================================
// Reset Password
// ===========================================
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid OTP' });

    const user = await Admin.findOne({ email }) || await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;
    await user.save();

    // Delete OTP
    await OTP.deleteMany({ email });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
