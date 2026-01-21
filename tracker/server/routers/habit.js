const { Router } = require('express')

const habitsController = require('../controllers/habit')

const habitsRouter = Router()

habitsRouter.post('/tracker', habitsController.create)