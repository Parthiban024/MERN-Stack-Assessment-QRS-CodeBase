// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Create a new course
router.post('/course', async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all courses
router.get('/allcourse', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
