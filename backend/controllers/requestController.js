const Request = require('../models/Request');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

// 📌 Student: Create New Request
exports.createRequest = async (req, res) => {
    try {
        const { category, description } = req.body;
        const images = req.files?.map(file => file.filename) || [];
        
        const newRequest = new Request({
            student: req.user.id,
            category,
            description,
            images,
        });

        await newRequest.save();
        res.status(201).json({ message: 'Request created successfully', request: newRequest });
    } catch (error) {
        console.error('Create Request Error:', error);
        res.status(500).json({ message: 'Failed to create request' });
    }
};

// 📌 Admin: Get All Requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('student', 'name enrollmentNumber email mobile college');
        res.json(requests);
    } catch (error) {
        console.error('Get Requests Error:', error);
        res.status(500).json({ message: 'Failed to fetch requests' });
    }
};

// 📌 Admin: Close a Request
exports.closeRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { solutionDescription } = req.body;
        const proofPhoto = req.file?.filename;

        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.status = 'closed';
        request.solutionDescription = solutionDescription;
        request.proofPhoto = proofPhoto;
        request.closedAt = new Date();

        await request.save();
        res.json({ message: 'Request closed successfully', request });
    } catch (error) {
        console.error('Close Request Error:', error);
        res.status(500).json({ message: 'Failed to close request' });
    }
};
