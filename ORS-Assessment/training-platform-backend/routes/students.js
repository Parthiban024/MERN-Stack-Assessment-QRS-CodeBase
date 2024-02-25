// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/student', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all students
router.get('/allstudent', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a student
router.put('studentUpdate/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student
router.delete('studentDelete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
