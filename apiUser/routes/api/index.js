const router = require('express').Router()
const user = require('./user')
const map = require('./map')

router.use('/user',user)
router.use('/map',map)
module.exports = router