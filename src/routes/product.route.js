const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole } = require('../middlewares/authentication');
const { getProduct, getProducts, createProduct, modifyProduct, deleteProduct } = require('../controllers/product.controller')

router.get('/find/:id', [verifyToken, verifySaleRole], getProduct);
router.get('/list', [verifyToken, verifySaleRole], getProducts);
router.post('/', [verifyToken, verifySaleRole], createProduct);
router.put('/:id', [verifyToken, verifySaleRole], modifyProduct);
router.delete('/:id', [verifyToken, verifySaleRole], deleteProduct);

module.exports = router;