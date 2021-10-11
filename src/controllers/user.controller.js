const bcrypt = require('bcrypt');

const { httpError, permissonFailed } = require('../helpers/handleError')
const userModel = require('../models/user.model');

const getUser = (req, res) => {
    return res.json({
        ok: true,
        user: req.user
    });
}

const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 5;
    try {
        const total = await userModel.countDocuments({ state: true });
        const listUsers = await userModel.find({ state: true }).skip(from).limit(limit);
        return res.json({ ok: true, total, listUsers});
    } catch (e) {
        httpError(res, e);
    }    
}

const createUser = async (req, res) => {
    try {
        const { username, role, name, lastname, email } = req.body
        const password = bcrypt.hashSync(req.body.password, 10);
        const resDetail = await userModel.create({ username, password, role, name, lastname, email });
        return res.json({
            ok: true,
            userCreated: resDetail
        });
    } catch (e) {
        httpError(res, e);
    }
}
const modifyUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (id != req.user._id) {
            return permissonFailed(res);
        }
        const { name, lastname, email } = req.body
        const resDetail = await userModel.findByIdAndUpdate(id, { name, lastname, email }, { new: true, runValidators: true });
        return res.json({
            ok: true,
            userModified: resDetail
        });
    } catch (e) {
        httpError(res, e);
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const resDetail = await userModel.findByIdAndUpdate(id, { state: false }, { new: true });
        return res.json({
            ok: true,
            msg: `User ${resDetail.username} deleted!`
        });
    } catch (e) {
        httpError(res, e);
    }
}

module.exports = { getUser, getUsers, createUser, modifyUser, deleteUser }