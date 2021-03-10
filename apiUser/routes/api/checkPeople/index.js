const router = require('express').Router()
const controller = require('./controller')

router.get('/getPeople',controller.getPeople)
router.get('/getAlarm',controller.getAlarm)
module.exports = router