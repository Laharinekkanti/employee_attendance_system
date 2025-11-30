const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/auth'); // path to your auth file

router.post('/mark', authMiddleware, attendanceController.markAttendance);
router.post('/checkout', authMiddleware, attendanceController.markCheckout);
router.get('/', authMiddleware, attendanceController.getAttendance);
router.get('/all-records', authMiddleware, attendanceController.getAllAttendance);

module.exports = router;
