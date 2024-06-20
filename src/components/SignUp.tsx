import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import env from 'react-dotenv';
import { Navigate, useNavigate } from 'react-router-dom';

// get BACKEND_PORT from .env file
const BACKEND_PORT = env.REACT_APP_BACKEND_PORT;

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/heet434">
        Heet Patel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: '',
    user_id: '', // Roll No. for student, Registration No. for instructor
    branch: '',
    stream: '',
    joining_year: '',
    passwd: '',
  });

  const [role, setRole] = React.useState('student');

  const handleRoleChange = (event : any) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event :any) => {
    event.preventDefault();
    
    //console.log(formData, role); 
    axios.post(`${BACKEND_PORT}/addUser`, {
        ...formData,
        role,
        })
        .then((response) => {
            console.log(response.data.message);
            // redirect to login page
            navigate('/');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error occurred while signing up')
        });
  };

  return (
    <ThemeProvider theme={defaultTheme}> 
      <Container component="main" maxWidth="xs" sx={{
        backgroundImage: `url('https://picsum.photos/1500/1500')`,
        backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        borderRadius: '10px',
        top: '-50%',
        boxShadow: '0 0 30px rgba(0,0,0,0.2)',
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal" required sx={
                {
                  mb: 2
                }
              }>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                name="role"
                value={role}
                onChange={handleRoleChange}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="course instructor">Instructor</MenuItem>
              </Select>
            </FormControl>

            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={
                {
                  mb: 2
                }
              }
            />

            <TextField
              required
              fullWidth
              id="user_id"
              label={role === 'student' ? 'Roll No.' : 'Registration No.'}
              name="user_id"
              onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
              sx={
                {
                  mb: 2
                }
              }
            />

            <TextField
              required
              fullWidth
              id="branch"
              label={role === 'student' ? 'Branch' : 'Department'}
              name="branch"
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              sx={
                {
                  mb: 2
                }
              }
            />

            {role === 'student' && (
              <TextField
                required
                fullWidth
                id="stream"
                label="Stream"
                name="stream"
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                sx={
                    {
                      mb: 2
                    }
                  }
              />
            )}
            {role === 'student' && (
                <TextField
                required
                fullWidth
                name="joiningYear"
                label="Joining Year"
                type="number"
                id="joiningYear"
                onChange={(e) => setFormData({ ...formData, joining_year: e.target.value })}
                sx={
                    {
                      mb: 2
                    }
                  }
                />
            )}

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(e) => setFormData({ ...formData, passwd: e.target.value })}
              sx={
                {
                  mb: 2
                }
              }
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
