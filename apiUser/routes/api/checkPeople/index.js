const router = require('express').Router()
const controller = require('./controller')

router.get('/getPeople',controller.getPeople)
router.get('/getAlarm',controller.getAlarm)
router.get('/getCovid',controller.getCovid)
module.exports = router