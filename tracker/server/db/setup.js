require("dotenv").config();
const fs = require("fs");
const db = require("./connect");

const sql = fs.readFileSync("./server/db/habits.sql").toString();

db.query(sql)
  .then((data) => {
    db.end();
    console.log("Database Setup Complete.");
  })
  .catch((error) => console.log(error));
