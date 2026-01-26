const { Pool} = require('pg');
require('dotenv').config();

const db = new Pool ({
    connectString: process.env.DB_URL
})

module.exports = db; 

//connect.js