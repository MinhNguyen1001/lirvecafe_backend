const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.get('/pick/:id', cartController.getCart);
router.post('/add', cartController.addToCart);
router.delete('/delete', cartController.deleteToCart);
router.put('/update', cartController.updateState);
router.post('/create', cartController.createCart);
router.delete('/delete_cart/:id', cartController.deleteCart);

module.exports = router;
