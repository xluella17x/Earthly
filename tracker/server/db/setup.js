require('dotenv').config();
const fs = require('fs');
const db = require('./connect');

const sql = fs.readFileSync('./tracker/server/db/habits.sql');

db.query(sql)
    .then(data => {
        db.end();
        console.log('Database Setup Complete.')
    })
    .catch(error => console.log(error));