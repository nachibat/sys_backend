const express = require('express');
const router = express.Router();

const { getFund, createFund, searchFundRange, findLastOne } = require('../controllers/fund.controller');
const { verifyToken, verifySaleRole } = require('../middlewares/authentication');

router.get('/find/:id', [verifyToken, verifySaleRole], getFund);
router.get('/search', [verifyToken, verifySaleRole], searchFundRange);
router.get('/lastone', [verifyToken, verifySaleRole], findLastOne)
router.post('/', [verifyToken, verifySaleRole], createFund);

module.exports = router;