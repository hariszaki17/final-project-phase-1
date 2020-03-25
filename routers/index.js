const router = require('express').Router()
const payment = require('./payment')
router.use('/payments', payment)

module.exports = router