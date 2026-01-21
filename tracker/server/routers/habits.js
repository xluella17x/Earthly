const { Router } = require('express')

const habitsController = require('../controllers/habits')

const habitsRouter = Router()

habitsRouter.post('/tracker', habitsController.create)
habitsRouter.patch('/tracker', habitsController.update)
habitsRouter.delete('/tracker', habitsController.destroy)