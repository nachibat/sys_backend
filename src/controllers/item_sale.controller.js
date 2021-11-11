const { httpError, failToFind } = require('../helpers/handleError');
const itemSaleModel = require('../models/item_sale.model');

const getItemSale = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await itemSaleModel.findById(id);
        if (!item) { return failToFind(res, { kind: 'ObjectId' }, 'item'); }
        return res.json({ ok: true, item });
    } catch (e) {
        return failToFind(res, e, 'item');
    }
}

const createItemSale = async (req, res) => {
    try {
        const { id_sale, barcode, price, quantity } = req.body;
        const itemCreated = await itemSaleModel.create({ id_sale, barcode, price, quantity });
        return res.json({ ok: true, itemCreated });
    } catch (e) {
        httpError(res, e);
    }
}

const modifyItemSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const itemModified = await itemSaleModel.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!itemModified) { return failToFind(res, { kind: 'ObjectId' }, 'item'); }
        return res.json({ ok: true, itemModified });
    } catch (e) {
        failToFind(res, e, 'item');
    }
}

const deleteItemSale = async (req, res) => {
    try {
        const { id } = req.params;
        const itemDeleted = await itemSaleModel.findByIdAndDelete(id);
        if (!itemDeleted) { return failToFind(res, { kind: 'ObjectId' }, 'item'); }
        return res.json({
            ok: true,
            message: `Item ${itemDeleted._id} deleted!`
        });
    } catch (e) {
        return failToFind(res, e, 'item');
    }
}

module.exports = { getItemSale, createItemSale, modifyItemSale, deleteItemSale }