// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



// Register
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         // Check if user with the same email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (err) {
     
//             console.error(err); // Log the error
//             res.status(500).json({ message: 'Internal Server Error' });
      
        
//     }
// });

// Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if password is correct
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, 'trainingPlatform', { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;
