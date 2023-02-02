const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/users');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, getUser);

module.exports = router;
