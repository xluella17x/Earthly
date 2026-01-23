const { Habit } = require('../models/Habit')

const create = async (req, res) => {
    try {
        const data = req.body
        const result = await Habit.create(data)
        console.log(req.body);
        res.status(200).json({
            "success": true,
            "result": result
        })
    } catch (err) {
        res.status(500).json({ error: err.message || 'Unknown error' })
    }
}

module.exports = { create }