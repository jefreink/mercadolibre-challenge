const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

const {
	getUserPurchases,
	getDetailPurchase,
} = require('../controllers/purchases');

router.get('/', verifyToken, getUserPurchases);
router.get('/:id', verifyToken, getDetailPurchase);

module.exports = router;
