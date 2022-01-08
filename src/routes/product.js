const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.get('/get_all', productController.getProducts);
router.put('/update_stock', productController.setProductStock);
router.post('/create', productController.addProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update_state', productController.updateProductState);
router.get('/get_by_id/:id', productController.searchProduct);
router.get('/check_quantity/:id/:stock', productController.checkQuantity);

module.exports = router;
