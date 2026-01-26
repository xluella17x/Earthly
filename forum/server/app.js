const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welcome to the Earthly API');
});

app.use('/users', userRouter);

module.exports = app;
