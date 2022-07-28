const express = require('express');

const router = express.Router();
const { doPayment } = require('../controllers/paymentController');

router.route('/dopayment').post(doPayment);

module.exports = router;
