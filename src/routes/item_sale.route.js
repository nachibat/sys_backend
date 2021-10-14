const express = require('express');
const router = express.Router();

const { verifyToken, verifySaleRole } = require('../middlewares/authentication');
const { getItemSale, createItemSale, modifyItemSale, deleteItemSale } = require('../controllers/item_sale.controller');

router.get('/:id', [verifyToken, verifySaleRole], getItemSale);
router.post('/', [verifyToken, verifySaleRole], createItemSale);
router.put('/:id', [verifyToken, verifySaleRole], modifyItemSale);
router.delete('/:id', [verifyToken, verifySaleRole], deleteItemSale);

module.exports = router;