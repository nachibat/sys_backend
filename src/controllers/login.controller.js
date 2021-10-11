const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { httpError, loginError } = require('../helpers/handleError');
const userModel = require('../models/user.model');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) { return loginError(res); }
        if (!bcrypt.compareSync(password, user.password)) { return loginError(res); }
        const token = jwt.sign({ user }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });
        return res.json({
            ok: true,
            token
        });
    } catch (e) {
        httpError(res, e);
    }
}

module.exports = { login }