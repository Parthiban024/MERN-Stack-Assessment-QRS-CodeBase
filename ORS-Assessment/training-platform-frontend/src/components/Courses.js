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

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: ''
    });
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/courses');
            setCourses(response.data);
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
            if (updatingId) {
                await axios.put(`http://localhost:5000/update/courses/${updatingId}`, formData);
                alert('Course updated successfully');
            } else {
                await axios.post('http://localhost:5000/post/courses', formData);
                alert('Course added successfully');
            }
            setFormData({
                name: '',
                description: '',
                start_date: '',
                end_date: ''
            });
            fetchCourses(); // Fetch updated course list
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (course) => {
        setUpdatingId(course._id);
        setFormData({
            name: course.name,
            description: course.description,
            start_date: course.start_date,
            end_date: course.end_date
        });
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <h1>Add Course</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Course Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                    />
                    <TextField
                        fullWidth
                        label="Start Date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="End Date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary">Add Course</Button>
                </form>
            </div>

            <div style={{ flex: 1 }}>
                <h1>Courses</h1>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course._id}>
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>{course.description}</TableCell>
                                    <TableCell>{new Date(course.start_date).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell>{new Date(course.end_date).toLocaleDateString('en-GB')}</TableCell>

                                    <TableCell>
                                        <Button onClick={() => handleUpdate(course)}>Update</Button>
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

export default Courses;
