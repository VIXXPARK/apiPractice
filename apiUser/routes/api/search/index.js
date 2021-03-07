const router = require('express').Router()
const controller = require('./controller')

router.post('/trend',controller.trend)
module.exports=router
