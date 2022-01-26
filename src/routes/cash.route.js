const express = require('express');
const router = express.Router();

const { getCash, searchCashRange, createCash, modifyCash, deleteCash } = require('../controllers/cash.controller');
const { verifyToken, verifyAdminRole, verifySaleRole } = require('../middlewares/authentication');

router.get('/find/:id', [verifyToken, verifySaleRole], getCash);
router.get('/search', [verifyToken, verifySaleRole], searchCashRange);
router.post('/', [verifyToken, verifySaleRole], createCash);
router.put('/:id', [verifyToken, verifyAdminRole], modifyCash);
router.delete('/:id', [verifyToken, verifyAdminRole], deleteCash);

module.exports = router;