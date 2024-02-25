// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require('./models/course');
const Student = require('./models/student');
const Schedule = require('./models/schedule');
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://ParthiGMR:Parthiban7548@parthibangmr.1quwer2.mongodb.net/empmonit', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/students', require('./routes/students'));
// app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/auth', require('./routes/auth'));


// Register
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received registration request:', req.body); 
    try {
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ message: 'Internal Server Error' });
       
    }
});


//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user is admin
        if (email === 'admin@gmail.com' && password === 'admin@123') {
            // Generate JWT token for admin
            const token = jwt.sign({ isAdmin: true }, 'trainingPlatform', { expiresIn: '1h' });
            return res.status(200).json({ token });
        }

        // Find user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token for regular user
        const token = jwt.sign({ id: user._id, isAdmin: false }, 'trainingPlatform', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ message: err.message });
    }
});




// GET /courses - Get all courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /courses - Create a new course
app.post('/post/courses', async (req, res) => {
    const { name, description, start_date, end_date } = req.body;

    try {
        const newCourse = new Course({ name, description, start_date, end_date });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /courses/:id - Delete a course by id
app.delete('/delete/courses/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await Course.findByIdAndDelete(id);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Update a course by ID
app.put('/update/courses/:id', async (req, res) => {
    const { name, description, start_date, end_date } = req.body;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {
            name,
            description,
            start_date,
            end_date
        }, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new student
app.post('/post/students', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a student by ID
app.delete('/delete/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findOneAndDelete({ _id: id });
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Update a student
app.put('/update/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;
        student.phone_number = req.body.phone_number || student.phone_number;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//training schedule 

app.get('/training-schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/post/training-schedules', async (req, res) => {
    const schedule = new Schedule({
        course: req.body.course,
        email: req.body.email,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location
    });
    try {
        const newSchedule = await schedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});


app.put('/training-schedules/update/:id', async (req, res) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




app.delete('/training-schedules/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSchedule = await Schedule.findOneAndDelete({ _id: id });
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

//in/out training
// Backend Code

// Get students and their opt-in/out status for training
app.get('/students/opt-in-out', async (req, res) => {
    try {
        // Find all students
        const students = await User.find();

        // Find all training schedules
        const trainingSchedules = await Schedule.find();

        // Map students with their opt-in/out status
        const studentOptInOut = students.map((student) => {
            const isInTraining = trainingSchedules.some((schedule) => schedule.email === student.email);
            return { ...student._doc, isInTraining };
        });

        res.status(200).json(studentOptInOut);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
