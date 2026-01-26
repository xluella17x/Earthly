require("dotenv").config();
const fs = require("fs");
const db = require("./connect");


const sql = fs.readFileSync("./server/db/posts.sql").toString();

db.query(sql)
    .then((data) => {
        db.end();
        console.log("Database setup Complete.");
    })

    .catch((error) => console.log(error));