const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Request = require('../models/Request');
const SOS = require('../models/SOS');
const College = require('../models/College');

// Admin sees alerts (recent SOS requests)
exports.getAlerts = async (req, res) => {
    try {
        const alerts = await SOS.find({ status: 'active' }).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching alerts." });
    }
};

// Admin sees all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('college', 'name');
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching students." });
    }
};

// Admin manages student requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('student', 'name en_no email phone');
        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching requests." });
    }
};

// Admin closes a request
exports.closeRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { solutionDescription, proofImage } = req.body;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found." });
        }

        request.solutionDescription = solutionDescription;
        request.proofImage = proofImage;
        request.status = "solved";
        request.solvedAt = new Date();
        await request.save();

        res.json({ message: "Request closed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error closing the request." });
    }
};

// Admin closes an SOS complaint
exports.closeSOS = async (req, res) => {
    try {
        const { sosId } = req.params;
        const { problemDescription, solutionDescription } = req.body;

        const sos = await SOS.findById(sosId);
        if (!sos) {
            return res.status(404).json({ message: "SOS complaint not found." });
        }

        sos.problemDescription = problemDescription;
        sos.solutionDescription = solutionDescription;
        sos.status = "closed";
        sos.closedAt = new Date();
        await sos.save();

        res.json({ message: "SOS complaint closed successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error closing the SOS complaint." });
    }
};

// Admin adds a new college
exports.addCollege = async (req, res) => {
    try {
        const { name, emergencyNumber } = req.body;

        const existing = await College.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: "College already exists." });
        }

        const college = new College({ name, emergencyNumber });
        await college.save();

        res.status(201).json({ message: "College added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding college." });
    }
};

// Get all colleges (for dropdown)
exports.getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching colleges." });
    }
};
