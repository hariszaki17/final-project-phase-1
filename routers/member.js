const router = require('express').Router()
const MemberController = require('../controllers/member')

router.get('/', MemberController.findAll)
router.post('/add', MemberController.add)
router.get('/add', MemberController.viewAdd)

module.exports = router