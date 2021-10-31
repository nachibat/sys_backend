const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole, verifyAdminRole } = require('../middlewares/authentication');
const { getProduct, getProducts, createProduct, modifyProduct, deleteProduct } = require('../controllers/product.controller')

router.get('/find/:id', [verifyToken, verifySaleRole], getProduct);
router.get('/list', [verifyToken, verifySaleRole], getProducts);
router.post('/', [verifyToken, verifyAdminRole], createProduct);
router.put('/:id', [verifyToken, verifyAdminRole], modifyProduct);
router.delete('/:id', [verifyToken, verifyAdminRole], deleteProduct);

module.exports = router;