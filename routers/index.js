const router = require('express').Router()
const payment = require('./payment')
const member = require('./member')
const vehicle = require('./vehicle')
const building = require('./building')
const checkin = require('./checkin')
const checkout = require('./checkout')
const login = require('./login')
const LoginController = require('../controllers/login')


router.post('/login', LoginController.login)
router.get('/login', (req, res) => {
    res.render('login.ejs')
})
router.get('/', LoginController.check, (req, res) => {
    res.render('home.ejs')
})
router.use('/payments', LoginController.check, payment)
router.use('/members', LoginController.check, member)
router.use('/vehicles', LoginController.check, vehicle)
router.use('/buildings', LoginController.check, building)
router.use('/checkIn', LoginController.check, checkin)
router.use('/checkOut', LoginController.check, checkout)


module.exports = router