const { Router } = require('express')

const habitsController = require('../controllers/habit')

const habitsRouter = Router()

habitsRouter.post('/habits', habitsController.create)

module.exports = { habitsRouter }