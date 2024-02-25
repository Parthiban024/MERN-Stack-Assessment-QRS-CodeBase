import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const CourseActions = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/courses/${id}`);
            alert('Course deleted successfully');
            setCourses(courses.filter(course => course._id !== id)); // Remove the deleted course from the state
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
            <h1>Courses</h1>
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
                            <TableCell>{formatDate(course.start_date)}</TableCell>
                            <TableCell>{formatDate(course.end_date)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(course._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CourseActions;
