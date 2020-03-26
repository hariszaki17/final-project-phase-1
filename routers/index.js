const router = require('express').Router()
const payment = require('./payment')
const member = require('./member')
const vehicle = require('./vehicle')
const building = require('./building')
const checkin = require('./checkin')
const checkout = require('./checkout')

router.get('/', (req, res) => {
    res.render('home.ejs')
})
router.use('/payments', payment)
router.use('/members', member)
router.use('/vehicles', vehicle)
router.use('/buildings', building)
router.use('/checkIn', checkin)
router.use('/checkOut', checkout)

module.exports = router