const { httpError, failToFind } = require('../helpers/handleError');
const cashModel = require('../models/cash.model');

const getCash = async (req, res) => {
    try {
        const { id } = req.params;    
        const cash = await cashModel.findById(id);
        if (!cash) { return failToFind(res, { kind: 'ObjectId' }, 'cash register'); }
        return res.json({ ok: true, cash });
    } catch (e) {
        return failToFind(res, e, 'cash register')
    }
}

const searchCashRange = async (req, res) => {
    try {
        const from = Date.parse(req.query.from) || new Date().setHours(0, 0, 0, 0);
        const to = Date.parse(req.query.to) || new Date().setHours(23, 0, 0, 0);
        const firstDate = new Date(new Date(from));
        const secondDate = new Date(new Date(to).setHours(44, 59, 59));
        const date = { createdAt: { $gte: firstDate, $lte: secondDate } };
        const total = await cashModel.countDocuments(date);
        const listCashes = await cashModel.find(date);
        return res.json({ ok: true, total, listCashes });
    } catch (e) {
        httpError(res, e);
    }
    
}

const createCash = async (req, res) => {
    try {
        const { cash, ivc, uvc, avc, kiosk, tksi, expenses, cigarettes, withdrawals } = req. body;
        const cashCreated = await cashModel.create({ cash, ivc, uvc, avc, kiosk, tksi, expenses, cigarettes, withdrawals });
        return res.json({ ok: true, cashCreated });
    } catch (e) {
        httpError(res, e);
    }
}

const modifyCash = async (req, res) => {
    try {
        const { id } = req.params;    
        const { cash, ivc, uvc, avc, kiosk, tksi, expenses, cigarettes, withdrawals } = req. body;
        const cashModified = await cashModel.findByIdAndUpdate(id, { cash, ivc, uvc, avc, kiosk, tksi, expenses, cigarettes, withdrawals }, { new: true });
        if (!cashModified) { return failToFind(res, { kind: 'ObjectId' }, 'cash register'); }
        return res.json({ ok: true, cashModified });
    } catch (e) {
        failToFind(res, e, 'cash register')
    }
}

const deleteCash = async (req, res) => {
    try {
        const { id } = req.params;
        const cashDeleted = await cashModel.findByIdAndDelete(id);
        if (!cashDeleted) { return failToFind(res, { kind: 'ObjectId' }, 'cash register'); }
        return res.json({
            ok: true,
            message: `Cash register ${cashDeleted._id} deleted!`
        });
    } catch (e) {
        return failToFind(res, e, 'cash register');
    }
}

module.exports = { getCash, searchCashRange, createCash, modifyCash, deleteCash }