const { httpError, failToFind } = require('../helpers/handleError');
const productModel = require('../models/product.model');

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) { return failToFind(res, { kind: 'ObjectId' }, 'product'); }
        return res.json({ ok: true, product });
    } catch (e) {
        return failToFind(res, e, 'product');
    }
}

const getProducts = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    const order = req.query.order || '';
    try {
        const total = await productModel.countDocuments({ status: true });
        const listProducts = await productModel.find({ status: true }).skip(from).limit(limit).sort(order);
        return res.json({ ok: true, total, listProducts });
    } catch (e) {
        httpError(res, e);
    }
}

const getAllProduct = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    const order = req.query.order || '';
    try {
        const total = await productModel.countDocuments({});
        const listProducts = await productModel.find({}).skip(from).limit(limit).sort(order);
        return res.json({ ok: true, total, listProducts });
    } catch (e) {
        httpError(res, e);
    }
}

const getStock = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;
    const order = req.query.order || 'quantity';
    const category = req.query.category || 'kiosko';
    try {
        const total = await productModel.countDocuments({ category, status: true });
        const listProducts = await productModel.find({ category, status: true }).skip(from).limit(limit).sort(order);
        return res.json({ ok: true, total, listProducts });
    } catch (e) {
        httpError(res, e);
    }
}

const searchProducts = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    const field = req.query.field || 'barcode';
    const term = req.query.term || '';
    const regex = new RegExp(term, 'i');
    let data = {};
    switch (field) {
        case 'barcode':
            data = { barcode: regex, status: true }
            break;
        case 'description':
            data = { description: regex, status: true }
            break;
        case 'category':
            data = { category: regex, status: true }
            break;
        default:
            break;
    }
    try {
        const total = await productModel.countDocuments(data);
        const listProducts = await productModel.find(data).skip(from).limit(limit);
        return res.json({ ok: true, total, listProducts });
    } catch (e) {
        httpError(res, e);
    }
    return res.json({ ok: true, msg: 'Ready' });
}

const createProduct = async (req, res) => {
    try {
        const { barcode, description, category, quantity, cost_price, percent_profit, price } = req.body;
        const productCreated = await productModel.create({ barcode, description, category, quantity, cost_price, percent_profit, price });
        return res.json({ ok: true, productCreated });
    } catch (e) {
        httpError(res, e);
    }
}

const modifyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { barcode, description, category, quantity, cost_price, percent_profit, price } = req.body;
        const productModified = await productModel.findByIdAndUpdate(id, { barcode, description, category, quantity, cost_price, percent_profit, price }, { new: true, runValidators: true });
        if (!productModified) { return failToFind(res, { kind: 'ObjectId' }, 'product'); }
        return res.json({ ok: true, productModified});
    } catch (e) {
        return failToFind(res, e, 'product');
    }        
}

const reduceStock = async (req, res) => {
    try {
        const { barcode, quantity } = req.body;
        const productModified = await productModel.findOneAndUpdate({ barcode }, { quantity }, { new: true });
        if (!productModified) { return failToFind(res, { kind: 'ObjectId' }, 'product'); }
        return res.json({ ok: true, productModified});
    } catch (e) {
        return failToFind(res, e, 'product');
    }    
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productDeleted = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!productDeleted) { return failToFind(res, { kind: 'ObjectId' }, 'product'); }
        return res.json({
            ok: true,
            message: `Product ${productDeleted.description} deleted!`,
            productDeleted
        });
    } catch (e) {
        return failToFind(res, e, 'product');
    }
}

const setStateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const status = true;
        const productModified = await productModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
        if (!productModified) { return failToFind(res, { kind: 'ObjectId' }, 'product'); }
        return res.json({ ok: true, productModified});
    } catch (e) {
        return failToFind(res, e, 'product');
    }        
}

module.exports = { getProduct, getProducts, getAllProduct, getStock, searchProducts, createProduct, modifyProduct, reduceStock, deleteProduct, setStateProduct }