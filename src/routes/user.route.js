const express = require('express');
const router = express.Router();

const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');
const { getUser, getUsers, createUser, modifyUser, deleteUser, changePassword } = require('../controllers/user.controller');

router.get('/', verifyToken, getUser);
router.get('/list', [verifyToken, verifyAdminRole], getUsers);
router.post('/', [verifyToken, verifyAdminRole], createUser);
router.put('/:id', verifyToken, modifyUser);
router.delete('/:id', [verifyToken, verifyAdminRole], deleteUser);
router.patch('/', verifyToken, changePassword);

module.exports = router;