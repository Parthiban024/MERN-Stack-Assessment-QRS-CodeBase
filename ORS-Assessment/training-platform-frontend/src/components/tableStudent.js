import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const StudentActions = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/students');
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/students/${id}`);
            alert('Student deleted successfully');
            setStudents(students.filter(student => student._id !== id)); // Remove the deleted student from the state
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Students</h1>
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
                                <Button onClick={() => handleDelete(student._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default StudentActions;
