// // routes/schedules.js
// const express = require('express');
// const router = express.Router();
// const Schedule = require('../models/schedule');

// // Create a new schedule
// router.post('/schedule', async (req, res) => {
//     try {
//         const schedule = await Schedule.create(req.body);
//         res.status(201).json(schedule);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Get all schedules
// router.get('/allschedule', async (req, res) => {
//     try {
//         const schedules = await Schedule.find();
//         res.json(schedules);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Update a schedule
// router.put('/scheduleUpdate/:id', async (req, res) => {
//     try {
//         const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(schedule);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Delete a schedule
// router.delete('/scheduleUpdate/:id', async (req, res) => {
//     try {
//         await Schedule.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Schedule deleted' });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// module.exports = router;
