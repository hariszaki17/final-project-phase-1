const router = require('express').Router()
const PDController = require('../controllers/parking-detail')

router.get('/', PDController.findAll)
router.get('/input-member', PDController.viewMember)
router.get('/input-member/:id/input-vehicle', PDController.viewVehicle)
router.get('/input-member/:id/input-vehicle/:idVeh', PDController.viewAdd)

module.exports = router