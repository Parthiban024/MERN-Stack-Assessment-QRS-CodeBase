import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const StudentOptInOut = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudentsOptInOut();
    }, []);

    const fetchStudentsOptInOut = async () => {
        try {
            const response = await axios.get('http://localhost:5000/students/opt-in-out');
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Student Opt-In/Out for Training</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Opt-In/Out Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student._id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.isInTraining ? 'Opted In' : 'Opted Out'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default StudentOptInOut;
