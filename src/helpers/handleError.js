const httpError = (res, err, status = 400, msg = 'something_wrong') => {    
    return res.status(status).json({
        ok: false,
        error: msg,
        detail: err
    });
}

const loginError = (res) => {
    return res.status(401).json({
        ok: false,
        error: 'login_failed',
        detail: { message: 'Wrong username or password' }
    });
}

const permissonFailed = (res) => {
    return res.status(401).json({
        ok: false,
        error: 'permisson_failed',
        detail: { message: 'User doesn\'t have permissons' }
    });
}

module.exports = { httpError, loginError, permissonFailed }