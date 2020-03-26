const router = require('express').Router()
const BuildingController = require('../controllers/building')

router.get('/', BuildingController.findAll)
router.get('/add', BuildingController.viewAdd)
router.post('/add', BuildingController.add)

module.exports = router