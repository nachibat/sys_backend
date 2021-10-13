const { httpError, failToFind } = require('../helpers/handleError')
const saleModel = require('../models/sale.model');

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

const getSales = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    try {
        // TODO: put search condition by data tange
        const total = await saleModel.countDocuments({});
        const listSales = await saleModel.find({}).skip(from).limit(limit);
        return res.json({ ok: true, total, listSales });
    } catch (e) {
        httpError(res, e);
    }
}

const createSale = async (req, res) => {
    try {
        const { id_user, total } = req.body;
        const saleCreated = await saleModel.create({ id_user, total });
        return res.json({ ok: true, saleCreated });
    } catch (e) {
        httpError(res, e)
    }
}

const modifySale = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, total } = req.body;
        const saleModified = await saleModel.findByIdAndUpdate(id, { id_user, total }, { new: true, runValidators: true });
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

module.exports = { getSale, getSales, createSale, modifySale, deleteSale }