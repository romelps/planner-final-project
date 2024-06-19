const mongoose = require('mongoose');

const taskSchema =  mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: Date,
    blurb: String,
    description: String,
    importance: Boolean,
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;