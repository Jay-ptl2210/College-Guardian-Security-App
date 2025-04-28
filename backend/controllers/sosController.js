const SOS = require('../models/SOS');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const {sendSMS} = require('../utils/sendSMS');

// 📌 Student: Trigger SOS (first message and start tracking if needed)

exports.triggerSOS = async(req,res)=>{
    try{
        const student = await Student.findById(req.user.id).populate('college');
        if(!student){
            return res.status(404).json({message:'Student not found'});
        }

        const emergencyNumber = student.college.adminMobile;

        const sosData = new SOS({
            student: student_id,
            location: req.body.location,
            messageCount: 1,
            lastMessageAt: new Date()
        });
        await sosData.save();

        const text = `🚨 SOS Alert! 
        Name: ${student.name}
        Enrollment No: ${student.enrollmentNumber}
        Location: ${req.body.location}`;

        // First SMS
        await sendSMS(emergencyNumber,text);
        res.status(201).json({message: 'SOS triggered and first alert sent successfully', sos: sosData});
    }catch (error){
        console.error('Triger SOS Error:',error);
        res.status(500).json({message:'Failed to trigger SOS'});
    }
};

// 📌 Internal (Auto Send Location Updates)

exports.sendLocationUpdate = async(req,res)=>{
    try{
        const sos = await SOS.findById(req.params.sosId).populate('student');
        if(!sos){
            return res.status(404).json({message: 'SOS not found'});
        }
        //Check if already sent 3 messages
        if(sos.messageCount>=3){
            return res.status(400).json({message:'Maximum emergency message sent'});
        }

        const emergencyNumber= sos.student.college.adminMobile;
        const text = `🚨 SOS Update!
Name: ${sos.student.name}
Enrollment No: ${sos.student.enrollmentNumber}
New Location: ${req.body.location}`;
        // Send SMS
        await sendSMS(emergencyNumber, text);

        //Update the SOS document
        sos.location = req.body.location;
        sos.messageCount +=1;
        sos.lastMessageAt=new Date();
        await sos.save();

        res.json({message: 'Location update sent successfully',sos});
    }catch(error){
        console.error('send Loaction uodate Error:',error);
        res.status(500).json({message: 'Failed to send location update'});
    }
};
// 📌 Admin: Get all SOS alerts
exports.getAllSOS = async (req, res) => {
    try {
        const sosAlerts = await SOS.find()
            .populate('student', 'name enrollmentNumber mobile college')
            .sort({ createdAt: -1 });

        res.json(sosAlerts);
    } catch (error) {
        console.error('Get All SOS Error:', error);
        res.status(500).json({ message: 'Failed to fetch SOS alerts' });
    }
};

// 📌 Admin: Close SOS
exports.closeSOS = async (req, res) => {
    try {
        const { problem, solution } = req.body;
        const sos = await SOS.findById(req.params.sosId);

        if (!sos) {
            return res.status(404).json({ message: 'SOS not found' });
        }

        sos.status = 'closed';
        sos.problem = problem;
        sos.solution = solution;
        sos.closedAt = new Date();

        await sos.save();

        res.json({ message: 'SOS closed successfully', sos });
    } catch (error) {
        console.error('Close SOS Error:', error);
        res.status(500).json({ message: 'Failed to close SOS' });
    }
};