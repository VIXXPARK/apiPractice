const router = require('express').Router()
const user = require('./user')
const map = require('./map')
const shorturl = require('./shorturl')
router.use('/user',user)
router.use('/map',map)
router.use('/shorturl',shorturl)
module.exports = router