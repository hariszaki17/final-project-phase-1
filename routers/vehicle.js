const router = require('express').Router()
const VehicleController = require('../controllers/vehicle')

router.get('/', VehicleController.findAll)
router.post('/add', VehicleController.add)
router.get('/add', VehicleController.viewAdd)

module.exports = router