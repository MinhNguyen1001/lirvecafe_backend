const express = require('express');
const router = express.Router();
const eventController = require('../app/controllers/EventController');

router.get('/pick/:customerId', eventController.checkId);

module.exports = router;