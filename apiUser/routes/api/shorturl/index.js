const router = require('express').Router()
const controller = require('./controller')
router.post('/geturl',controller.geturl)
module.exports=router