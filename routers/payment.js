const router = require('express').Router()
const PaymentController = require('../controllers/payment')

router.get('/', PaymentController.findAll)

module.exports = router