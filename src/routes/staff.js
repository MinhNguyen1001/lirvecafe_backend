const express = require('express');
const router = express.Router();
const staffController = require('../app/controllers/StaffController');

router.post('/add', staffController.createStaff);
router.get('/get_all', staffController.showAll);
router.get('/get_by_phone/:phone', staffController.showDetail);
router.delete('/delete/:id', staffController.deleteStaff);
router.put('/update', staffController.updateStaff);

module.exports = router;
