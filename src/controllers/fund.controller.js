const { httpError, failToFind } = require('../helpers/handleError');
const fundModel = require('../models/fund.model');

const getFund = async (req, res) => {
    try {
        const { id } = req.params;
        const fund = await fundModel.findById(id);
        if (!fund) { return failToFind(res, { kind: 'ObjectId' }, 'fund'); }
        return res.json({ ok: true, fund });
    } catch (e) {
        httpError(res, e);
    }
}

const createFund = async (req, res) => {
    try {
        const id_user = req.user._id;
        const cash_withdraw = Number(req.body.cash_withdraw) || 0;
        const expenses = Number(req.body.expenses) || 0;
        const description = req.body.description || '-';
        const lastFund = await findLastOne('', '', '', true);
        let total;
        if (lastFund) {
            cash_withdraw != 0 ? total = lastFund.total + cash_withdraw : total = lastFund.total - expenses;
        } else {
            total = cash_withdraw;
        }
        const fundCreated = await fundModel.create({ cash_withdraw, expenses, description, total, id_user });
        return res.json({ ok: true, fundCreated });
    } catch (e) {
        httpError(res, e);
    }
}

const searchFundRange = async (req, res) => {
    try {
        const pipeline = [];
        const from = Date.parse(req.query.from) || new Date().setHours(0, 0, 0, 0);
        const to = Date.parse(req.query.to) || new Date().setHours(23, 0, 0, 0);
        const firstDate = new Date(new Date(from));
        const secondDate = new Date(new Date(to).setHours(44, 59, 59));
        const date = { createdAt: { $gte: firstDate, $lte: secondDate } }
        const match = { $match: date };
        pipeline.push(match);
        const lookup = {
            $lookup: {
                from: 'users',
                localField: 'id_user',
                foreignField: '_id',
                as: 'user'
            }
        };
        pipeline.push(lookup);
        const project = {
            $project: {
                id_user: 0,
            }
        };
        pipeline.push(project);
        // const unset = { $unset: ['user.password', 'user._id', 'user.state', 'user.createdAt', 'user.updatedAt'] };
        // pipeline.push(unset); // Actualizar servidor mongo en produccion
        const unwind = {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        };
        pipeline.push(unwind);
        const total = await fundModel.countDocuments(date);
        const listFunds = await fundModel.aggregate(pipeline);
        return res.json({ ok: true, total, listFunds });
    } catch (e) {
        console.log(e)
        httpError(res, e);
    }
}

const findLastOne = async (req, res, next, local = false) => {
    try {
        const pipeline = [{ $sort: { createdAt: -1 } }];
        const listFunds = await fundModel.aggregate(pipeline);
        if (local) return listFunds[0]
        else return res.json({ ok: true, lastone: listFunds[0] });
    } catch (e) {
        console.error(e);
        if (local) return {}
        else httpError(res, e);
    }
}

module.exports = { getFund, createFund, searchFundRange, findLastOne }