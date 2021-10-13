const jwt = require('jsonwebtoken');
const { httpError, permissonFailed } = require('../helpers/handleError');

const verifyToken = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const decoded = jwt.verify(token, process.env.SEED)
        req.user = decoded.user;
        next();
    } catch (e) {
        httpError(res, e, 401, 'authorization_problem');
    }
    
}

const verifyAdminRole = (req, res, next) => {
    const user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        permissonFailed(res);
    }
}

const verifySaleRole = (req, res, next) => {
    const user = req.user;
    if (user.role === 'USER_ROLE') {
        permissonFailed(res);
    } else {
        next();
    }
}

module.exports = { verifyToken, verifyAdminRole, verifySaleRole }