import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ marginTop: '50px' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register
                    </Typography>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            type="text"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: '20px' }}
                        >
                            Register
                        </Button>
                    </form>
                    <Button onClick={handleLoginClick} color="primary" fullWidth sx={{ marginTop: '10px' }}>
                        Existing User Login
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Register;
