import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            localStorage.setItem('token', response.data.token);
            if (formData.email === 'admin@gmail.com' && formData.password === 'admin@123') {
                localStorage.setItem('isAdmin', 'true');
            }
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ marginTop: '50px' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </Button>
                    </form>
                    <Button onClick={handleRegisterClick} color="primary" fullWidth sx={{ marginTop: '10px' }}>
                        New user Register
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
