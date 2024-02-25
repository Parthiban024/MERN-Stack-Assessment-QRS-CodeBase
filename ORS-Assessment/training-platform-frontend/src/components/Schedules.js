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
    Paper,
    Grid
} from '@mui/material';

const TrainingSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [formData, setFormData] = useState({
        course: '',
        email: '',
        date: '',
        startTime: '',
        endTime: '',
        location: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/training-schedules');
            setSchedules(response.data);
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
            if (editId) {
                await axios.put(`http://localhost:5000/training-schedules/update/${editId}`, formData);
                alert('Schedule updated successfully');
            } else {
                await axios.post('http://localhost:5000/post/training-schedules', formData);
                alert('Schedule added successfully');
            }
            setFormData({
                course: '',
                email: '',
                date: '',
                startTime: '',
                endTime: '',
                location: ''
            });
            setEditId(null);
            fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (schedule) => {
        setFormData({
            course: schedule.course,
            email: schedule.email,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            location: schedule.location
        });
        setEditId(schedule._id);
    };

    return (
        <Container maxWidth="md" style={{ display: 'flex', gap: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div>
                        <h1>Add Schedule</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Start Time"
                                name="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={handleChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                label="End Time"
                                name="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={handleChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary">{editId ? 'Update' : 'Add'} Schedule</Button>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <h1>Schedules</h1>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {schedules.map((schedule) => (
                                        <TableRow key={schedule._id}>
                                            <TableCell>{schedule.course}</TableCell>
                                            <TableCell>{schedule.email}</TableCell>
                                            <TableCell>{new Date(schedule.date).toLocaleDateString('en-GB')}</TableCell>
                                            <TableCell>{schedule.startTime}</TableCell>
                                            <TableCell>{schedule.endTime}</TableCell>
                                            <TableCell>{schedule.location}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleEdit(schedule)}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TrainingSchedules;
