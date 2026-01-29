const express = require('express')
const cors = require('cors')

const { logger } = require('./middleware/logger')
const { habitsRouter } = require('./routers/habit')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.use('/tracker', habitsRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        "message": "Welcome to the tracker API"
    })
})

module.exports = {
    app
}