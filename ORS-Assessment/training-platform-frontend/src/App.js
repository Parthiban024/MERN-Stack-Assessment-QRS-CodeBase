import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import Students from './components/Students';
import Schedules from './components/Schedules';
import Present from './components/inOrout';
import TableCourses from './components/tableCourses';
import TableStudents from './components/tableStudent';
import TableSchedules from './components/tableSchedule';

// Create a context for managing authentication state
const AuthContext = createContext();

const Navigation = () => {
    const { isAdmin, logout } = useContext(AuthContext);
    const location = useLocation();

    if (location.pathname === '/login' || location.pathname === '/register') {
        return null; // Hide the navbar for login and register routes
    }

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Training Platform</Link>
                    </Typography>
                    <div>
                        {!isAdmin && (
                            <>
                                <Button color="inherit" component={Link} to="/courses">Courses</Button>
                                <Button color="inherit" component={Link} to="/students">Students</Button>
                                <Button color="inherit" component={Link} to="/schedules">Schedules</Button>
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <Button color="inherit" component={Link} to="/inOrout">Student Opt in / out for Training</Button>
                                <Button color="inherit" component={Link} to="/tableCourse">Table Courses</Button>
                                <Button color="inherit" component={Link} to="/tableStudent">Table Students</Button>
                                <Button color="inherit" component={Link} to="/tableSchedule">Table Schedule</Button>
                            </>
                        )}
                        <Button color="inherit" component={Link} to="/login" onClick={() => logout()}>Logout</Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const App = () => {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

    const login = () => {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
    };

    const logout = () => {
        setIsAdmin(false);
        localStorage.setItem('isAdmin', 'false');
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            <Router>
                <Navigation />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {!isAdmin && (
                        <>
                            <Route path="/courses" element={<Courses />} />
                            <Route path="/students" element={<Students />} />
                            <Route path="/schedules" element={<Schedules />} />
                        </>
                    )}
                    {isAdmin && <Route path="/inOrout" element={<Present />} />}
                    {isAdmin && <Route path="/tableCourse" element={<TableCourses />} />}
                    {isAdmin && <Route path="/tableStudent" element={<TableStudents />} />}
                    {isAdmin && <Route path="/tableSchedule" element={<TableSchedules />} />}
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
