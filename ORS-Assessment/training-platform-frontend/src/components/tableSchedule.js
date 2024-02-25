import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const StudentActions = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:5000/training-schedules');
                setSchedules(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSchedules();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/training-schedules/delete/${id}`);
            alert('Schedule deleted successfully');
            setSchedules(schedules.filter(schedule => schedule._id !== id)); // Remove the deleted schedule from the state
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <h1>Schedules</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schedules.map((schedule) => (
                        <TableRow key={schedule._id}>
                            <TableCell>{schedule.course}</TableCell>
                            <TableCell>{formatDate(schedule.date)}</TableCell>
                            <TableCell>{schedule.startTime} - {schedule.endTime}</TableCell>
                            <TableCell>{schedule.location}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(schedule._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default StudentActions;
