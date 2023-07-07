const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");

let userRoutes = require('./routes/user.js')
const mongoString = "mongodb://localhost:27017/shabeer"

mongoose.connect(mongoString)

let database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('database connected');
})

const app = express();

app.use(cors())

app.use(express.json());

app.use('/send',userRoutes)

app.use((req, res, next) => {
    res.status(404).send({ "status": 404, "message": "API URL Not Found", "error": true });
});

app.listen(3002, () => {
    console.log(`Server Started at ${3002}`)
})