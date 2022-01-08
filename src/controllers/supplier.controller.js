const { httpError, failToFind } = require('../helpers/handleError');
const supplierModel = require('../models/supplier.model');

const getSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await supplierModel.findById(id);
        if (!supplier) { return failToFind(res, { kind: 'ObjectId' }, 'supplier') }
        return res.json({ ok: true, supplier });
    } catch (e) {
        return failToFind(res, e, 'supplier');
    }
}

const getSuppliers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    const order = req.query.order || '';
    try {
        const total = await supplierModel.countDocuments({});
        const listSuppliers = await supplierModel.find({}).skip(from).limit(limit).sort(order);
        return res.json({ ok: true, total, listSuppliers });
    } catch (e) {
        httpError(res, e);
    }
}

const createSupplier = async (req, res) => {
    try {
        const { name, address, phone, mail } = req.body;
        const supplierCreated = await supplierModel.create({ name, address, phone, mail });
        return res.json({ ok: true, supplierCreated });
    } catch (e) {
        return httpError(res, e);
    }
}

const modifySupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, mail } = req.body;
        const supplierModified = await supplierModel.findByIdAndUpdate(id, { name, address, phone, mail }, { new: true });
        if (!supplierModified) { return failToFind(res, { kind: 'ObjectId' }, 'supplier') }
        return res.json({ ok: true, supplierModified });
    } catch (e) {
        return failToFind(res, e, 'supplier')
    }
}

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplierDeleted = await supplierModel.findByIdAndDelete(id);
        if (!supplierDeleted) { return failToFind(res, { kind: 'ObjectId' }, 'supplier') }
        return res.json({ ok: true, message: `Supplier ${supplierDeleted._id} deleted!` });
    } catch (e) {
        return failToFind(res, e, 'supplier');
    }
}

module.exports = { getSupplier, getSuppliers, createSupplier, modifySupplier, deleteSupplier }