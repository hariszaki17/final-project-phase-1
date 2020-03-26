const router = require('express').Router()
const PDController = require('../controllers/parking-detail')


router.get('/', PDController.scanner)
router.get('/:id', PDController.viewAddCheckout)
router.post('/:id/input', PDController.checkOutAdd)

module.exports = router