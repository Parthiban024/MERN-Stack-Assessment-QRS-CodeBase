// models/course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    start_date: Date,
    end_date: Date
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
