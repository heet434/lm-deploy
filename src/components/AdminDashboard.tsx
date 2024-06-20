import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer as MuiDrawer,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BookIcon from '@mui/icons-material/Book';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCardIcon from '@mui/icons-material/AddCard';
import LogoutIcon from '@mui/icons-material/Logout';
import env from 'react-dotenv';

// get BACKEND_PORT from .env file
const BACKEND_PORT = 'https://leavemanagement-production.up.railway.app';

const drawerWidth = 200;

interface AppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

const AdminDashboard = ({userLoginUtility}: {userLoginUtility: any}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [component, setComponent] = useState('dashboard');
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleAddCourse = async () => {
    try {
      const response = await axios.post(`${BACKEND_PORT}/addCourse`, {
        courseCode,
        courseTitle,
        instructorId
      });
      console.log('Course added:', response.data);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleAddStudentToCourse = async () => {
    try {
      const response = await axios.post(`${BACKEND_PORT}/addStudentToCourse`, {
        courseCode: selectedCourse,
        studentName,
        studentId
      });
      console.log('Student added to course:', response.data);
    } catch (error) {
      console.error('Error adding student to course:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarStyled position="absolute" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBarStyled>
        <Drawer variant="permanent" open={open}>
          <Toolbar>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Toolbar>
            <Button style={{ width: '100%' }} onClick={() => setComponent('addCourse')}>
              <BookIcon /> Add Course
            </Button>
          </Toolbar>
          <Toolbar>
            <Button style={{ width: '100%' }} onClick={() => setComponent('addStudentToCourse')}>
              <AddTaskIcon /> Add Student to Course
            </Button>
          </Toolbar>
          <Toolbar>
            <IconButton onClick={handleLogout} sx={{ width: '100%' }}>
              <LogoutIcon /> Logout
            </IconButton>
          </Toolbar>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {component === 'addCourse' && (
                <Paper>
                  <Typography variant="h6">Add New Course</Typography>
                  <TextField
                    label="Course Code"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                  />
                  <TextField
                    label="Course Title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                  <TextField
                    label="Instructor ID"
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleAddCourse}>
                    Add Course
                  </Button>
                </Paper>
              )}
              {component === 'addStudentToCourse' && (
                <Paper>
                  <Typography variant="h6">Add Student to Course</Typography>
                  <Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    {/* Render courses from API */}
                    <MenuItem value="course1">Course 1</MenuItem>
                    <MenuItem value="course2">Course 2</MenuItem>
                  </Select>
                  <TextField
                    label="Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  <TextField
                    label="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleAddStudentToCourse}>
                    Add Student
                  </Button>
                </Paper>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
