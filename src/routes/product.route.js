const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole, verifyAdminRole } = require('../middlewares/authentication');
const { getProduct, getProducts, getAllProduct, getStock, searchProducts, searchProductsPrice, createProduct, modifyProduct, reduceStock, deleteProduct, setStateProduct } = require('../controllers/product.controller')

router.get('/find/:id', [verifyToken, verifySaleRole], getProduct);
router.get('/list', [verifyToken, verifySaleRole], getProducts);
router.get('/search', [verifyToken, verifySaleRole], searchProducts);
router.get('/search-price', [verifyToken, verifySaleRole], searchProductsPrice);
router.get('/stock', [verifyToken, verifySaleRole], getStock);
router.post('/', [verifyToken, verifyAdminRole], createProduct);
router.put('/:id', [verifyToken, verifyAdminRole], modifyProduct);
router.patch('/reduce-stock', [verifyToken, verifySaleRole], reduceStock);
router.delete('/:id', [verifyToken, verifyAdminRole], deleteProduct);
router.post('/status/:id', [verifyToken, verifyAdminRole], setStateProduct); // Endpoint for development
router.get('/all', [verifyToken, verifyAdminRole], getAllProduct); // Endpoint for development

module.exports = router;