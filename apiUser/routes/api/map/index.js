const router = require('express').Router()
const controller = require('./controller')
router.get('/naver_cloud',controller.getmap)
module.exports = router