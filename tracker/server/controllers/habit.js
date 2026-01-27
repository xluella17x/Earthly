const { Habit } = require('../models/Habit');

async function create(req, res) {
    try {
        const data = req.body
        const result = await Habit.create(data)
        console.log(req.body);
        res.status(200).json({ data: result })
    } catch (err) {
        res.status(500).json({ error: err.message || 'Unknown error' })
    }
}

async function getStats(req, res) {
    try {
        const stats = await Habit.stats();
        console.log(stats);
        res.status(200).json(stats);
    } catch(err) {
        res.status(404).json({error: 'Stats could not be fetched.'});
    };
};

module.exports = {
  create,
  getStats};
