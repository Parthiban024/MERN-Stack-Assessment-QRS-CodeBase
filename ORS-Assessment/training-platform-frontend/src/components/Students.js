import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    TextField,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: ''
    });
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/students');
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedStudentId) {
                await axios.put(`http://localhost:5000/update/students/${selectedStudentId}`, formData);
                alert('Student updated successfully');
            } else {
                await axios.post('http://localhost:5000/post/students', formData);
                alert('Student added successfully');
            }
            setFormData({
                name: '',
                email: '',
                phone_number: ''
            });
            setSelectedStudentId(null);
            fetchStudents(); // Fetch updated student list
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (student) => {
        setFormData({
            name: student.name,
            email: student.email,
            phone_number: student.phone_number
        });
        setSelectedStudentId(student._id);
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <h1>Add Student</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {selectedStudentId ? 'Update' : 'Add'} Student
                    </Button>
                </form>
            </div>

            <div style={{ flex: 1 }}>
                <h1>Students</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.phone_number}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(student)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
};

export default Students;
