const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
// const cors = require('cors');
const taskRouter = require('./controllers/tasks.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// app.use(cors());
app.use(express.json());

app.use('/tasks', taskRouter);

app.listen(3000, () =>{
    console.log('Listening on 3000')
})
