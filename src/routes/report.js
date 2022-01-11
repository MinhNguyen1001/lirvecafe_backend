const express = require('express');
const router = express.Router();
const reportController = require('../app/controllers/ReportController');

router.get('/pick', reportController.getReport);
router.put('/update', reportController.updateCost);

module.exports = router;