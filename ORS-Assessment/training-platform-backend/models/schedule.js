// models/trainingSchedule.js
const mongoose = require('mongoose');

const trainingScheduleSchema = new mongoose.Schema({
    course: {
        type: String,

        required: true
    },
    email: {
        type: String,

        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const TrainingSchedule = mongoose.model('TrainingSchedule', trainingScheduleSchema);

module.exports = TrainingSchedule;
