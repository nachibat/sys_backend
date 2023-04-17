const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole } = require('../middlewares/authentication');
const { getSale, getSalesByDate, getSalePhotocopies, getTodaySales, createSale, modifySale, deleteSale } = require('../controllers/sale.controller')

router.get('/find/:id', [verifyToken, verifySaleRole], getSale);
router.get('/list', [verifyToken, verifySaleRole], getTodaySales);
router.get('/search', [verifyToken, verifySaleRole], getSalesByDate);
router.get('/photocopies', [verifyToken, verifySaleRole], getSalePhotocopies);
router.post('/', [verifyToken, verifySaleRole], createSale);
router.put('/:id', [verifyToken, verifySaleRole], modifySale);
router.delete('/:id', [verifyToken, verifySaleRole], deleteSale);

module.exports = router;