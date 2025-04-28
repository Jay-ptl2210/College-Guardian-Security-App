const express=require('express');
const router = express.Router();
const {createRequest, getAllRequests, closeRequest}=require('../controllers/requestController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const multer = require('multer');

//Multer setup for file uploads

const storage =multer.diskStorage({
    destination:(req,file,cd)=>{
        cb(null,'uploads/requests/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({storage});

// Student Side
router.post('/create', isAuthenticated, upload.array('images', 5), createRequest);

// Admin Side
router.get('/all', isAdmin, getAllRequests);
router.put('/:requestId/close', isAdmin, upload.single('proofPhoto'), closeRequest);

module.exports = router;
