const Habit = require('../models/Habit');

async function getStats(req, res) {
    try {
        const stats = Habit.stats();
        res.status(200).json(stats);
    } catch(err) {
        res.status(404).json({error: 'Stats could not be fetched.'})
    }
}

module.exports = getStats;