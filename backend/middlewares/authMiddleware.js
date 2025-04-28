// /middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

// Student Authentication Middleware
const protectStudent = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.student = await Student.findById(decoded.id).select('-password');
            if (!req.student) {
                return res.status(401).json({ message: 'Student not found' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized student' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};

// Admin Authentication Middleware
const protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.id).select('-password');
            if (!req.admin) {
                return res.status(401).json({ message: 'Admin not found' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized admin' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { protectStudent, protectAdmin };
