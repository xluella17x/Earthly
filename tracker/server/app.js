const express = require('express')
const cors = require('cors')

const { logger } = require('./middleware/logger')
const { habitsRouter } = require('./routers/habits')


const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.use('/tracker', habitsRouter)

app.get('/', (req, res) => {
    res.status(200).json()
})

module.exports = {
    app
}