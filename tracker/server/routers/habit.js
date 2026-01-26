const { Router } = require('express')
const habitsController = require('../controllers/habit')

const habitsRouter = Router()

habitsRouter.post('/', habitsController.create)
habitsRouter.get('/', habitsController.getStats)

module.exports = { habitsRouter };
