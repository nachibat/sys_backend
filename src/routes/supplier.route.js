const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole, verifyAdminRole } = require('../middlewares/authentication');
const { getSupplier, getSuppliers, createSupplier, modifySupplier, deleteSupplier } = require('../controllers/supplier.controller');

router.get('/find/:id', [verifyToken, verifySaleRole], getSupplier);
router.get('/list', [verifyToken, verifySaleRole], getSuppliers);
router.post('/', [verifyToken, verifyAdminRole], createSupplier);
router.put('/:id', [verifyToken, verifyAdminRole], modifySupplier);
router.delete('/:id', [verifyToken, verifyAdminRole], deleteSupplier);

module.exports = router