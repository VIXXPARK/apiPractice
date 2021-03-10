const router = require('express').Router()
const controller = require('./controller')

router.get('/getPeople',controller.getPeople)

module.exports = router