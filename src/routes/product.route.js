const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole, verifyAdminRole } = require('../middlewares/authentication');
const { getProduct, getProducts, searchProducts, createProduct, modifyProduct, deleteProduct } = require('../controllers/product.controller')

router.get('/find/:id', [verifyToken, verifySaleRole], getProduct);
router.get('/list', [verifyToken, verifySaleRole], getProducts);
router.get('/search', [verifyToken, verifySaleRole], searchProducts);
router.post('/', [verifyToken, verifyAdminRole], createProduct);
router.put('/:id', [verifyToken, verifyAdminRole], modifyProduct);
router.delete('/:id', [verifyToken, verifyAdminRole], deleteProduct);

module.exports = router;