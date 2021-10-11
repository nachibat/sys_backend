const express = require('express');
const router = express.Router();
const fs = require('fs');

const { httpError } = require('../helpers/handleError');

const pathRouter = `${__dirname}`;
const removeExtension = (filename) => {
    return filename.split('.').shift();
}

fs.readdirSync(pathRouter).filter((file) => {
    const filename = removeExtension(file);
    const skip = ['routes'].includes(filename);
    if (!skip) {
        router.use(`/${filename}`, require(`./${filename}.route`));
        console.log('LOADED ROUTE ---->', filename);
    }
});


router.get('*', (req, res) => {
    return httpError(res, { message: 'Wrong path' }, 404, 'not_found');
});

module.exports = router;