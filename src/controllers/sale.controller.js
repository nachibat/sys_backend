const { httpError, failToFind } = require('../helpers/handleError')
const saleModel = require('../models/sale.model');
const itemSaleModel = require('../models/item_sale.model');

const getSale = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await saleModel.findById(id);
        if (!sale) { return failToFind(res, { kind: 'ObjectId' }, 'sale') }
        return res.json({ ok: true, sale });
    } catch (e) {
        return failToFind(res, e, 'sale')
    }
}

const getSalesByDate = async (req, res) => {
    const from = Date.parse(req.query.from) || new Date().setHours(0, 0, 0, 0);
    const to = Date.parse(req.query.to) || new Date().setHours(23, 0, 0, 0);
    const firstDate = new Date(new Date(from));
    const secondDate = new Date(new Date(to).setHours(44, 59, 59));
    const date = { createdAt: { $gte: firstDate, $lte: secondDate } };
    try {
        const total = await saleModel.countDocuments(date);
        const listSales = await saleModel.find(date).populate('id_user', 'username role');
        return res.json({ ok: true, total, listSales });
    } catch (e) {
        httpError(res, e);
    }
}

const getSalePhotocopies = async (req, res) => {
    try {
        const from = Date.parse(req.query.from) || new Date().setHours(0, 0, 0, 0);
        const to = Date.parse(req.query.to) || new Date().setHours(23, 0, 0, 0);
        const firstDate = new Date(new Date(from));
        const secondDate = new Date(new Date(to).setHours(44, 59, 59));
        let photocopyItems = [];
        const date = { createdAt: { $gte: firstDate, $lte: secondDate } };
        const sales = await saleModel.find(date);
        for (const s of sales) {
            const items = await itemSaleModel.find({ id_sale: s._id }).populate('product', 'barcode description category');
            const photocopies = items.filter(i => i.product.barcode === '0000003');
            photocopyItems.push(...photocopies);
        }
        let totalCash = 0;
        photocopyItems.map(p => totalCash += p.price * p.quantity);
        return res.json({ ok: true, totalItems: photocopyItems.length, totalCash, photocopyItems });
    } catch (e) {
        return failToFind(res, e, 'sale');
    }
}

const getTodaySales = async (req, res) => {
    const today = new Date();
    const date = { createdAt: { $gte: today.setHours(0, 0, 0, 0), $lte: today.setHours(24, 0, 0, 0) } };
    try {
        const total = await saleModel.countDocuments(date);
        const listSales = await saleModel.find(date);
        return res.json({ ok: true, total, listSales });
    } catch (e) {
        httpError(res, e);
    }
}

const createSale = async (req, res) => {
    try {
        const { id_user, payment, total } = req.body;
        const saleCreated = await saleModel.create({ id_user, payment, total });
        return res.json({ ok: true, saleCreated });
    } catch (e) {
        httpError(res, e)
    }
}

const modifySale = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, payment, total } = req.body;
        const saleModified = await saleModel.findByIdAndUpdate(id, { id_user, payment, total }, { new: true, runValidators: true });
        if (!saleModified) { return failToFind(res, { kind: 'ObjectId' }, 'sale') }
        return res.json({ ok: true, saleModified });
    } catch (e) {
        failToFind(res, e, 'sale');
    }
}

const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const saleDeleted = await saleModel.findByIdAndDelete(id);
        if (!saleDeleted) { return failToFind(res, { kind: 'ObjectId' }, 'sale'); }
        return res.json({
            ok: true,
            message: `Sale ${saleDeleted._id} deleted!`
        });
    } catch (e) {
        return failToFind(res, e, 'sale');
    }
}

module.exports = { getSale, getSalesByDate, getSalePhotocopies, getTodaySales, createSale, modifySale, deleteSale }