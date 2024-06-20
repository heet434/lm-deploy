import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import UserProfile from './UserProfile';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import AdminDashboard from './AdminDashboard';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import SignUp from './SignUp';
import axios from 'axios';
import env from 'react-dotenv';
//const navigate = useNavigate();

// get BACKEND_PORT from .env file
const BACKEND_PORT = 'https://leavemanagement-production.up.railway.app';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/heet434">
        Heet Patel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

async function authenticateUser(userDetail: any): Promise<boolean> {
    try {
        const toSend = {
            user_id: Number(userDetail.user_id),
            passwd: userDetail.passwd,
            role: userDetail.role
        };

        const response = await axios.post(`${BACKEND_PORT}/userVerify`, toSend);

        // Assuming the response includes some authentication information
        // You might need to adjust this based on the response structure
        //console.log(response.data);
        if(response.data[0].user_id == toSend.user_id && response.data[0].passwd == toSend.passwd && response.data[0].role == toSend.role){
            return true;
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        // Handle error, e.g., logging, error reporting, etc.
        return false; // Authentication failed due to error
    }
    return false; // Authentication failed due to invalid credentials
}



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide({userLoginUtility}: {userLoginUtility: any}) {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const userDetail = {
        user_id: data.get('username'),
        passwd: data.get('password'),
        role: data.get('role'),
      };
  
      // Authenticate the user
      const isAuthenticated = await authenticateUser(userDetail);
  
      if (isAuthenticated) {
        // Set user credentials and role
        // Assuming UserProfile is properly defined
        UserProfile.setUserName(userDetail.user_id as string);
        UserProfile.setPassword(userDetail.passwd as string);
        UserProfile.setRole(userDetail.role as string);
        
        // Log the user in and redirect to the Dashboard according to the role
        userLoginUtility.logUserIn(true);
        if (userDetail.role === 'student') {
          navigate('/student');
        } else if (userDetail.role === 'course instructor') {
          navigate('/instructor');
        } else if (userDetail.role === 'admin') {
          navigate('/admin');
        }
      } else {
        alert("Invalid Username or Password");
      }
    };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://picsum.photos/1500/1500)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username" 
                label="Username" 
                name="username" 
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  label="Role"
                  name="role"
                  defaultValue="student"
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="course instructor">Instructor</MenuItem>
                  {/* <MenuItem value="admin">Admin</MenuItem> */}
                </Select>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                </Grid> */}
                <Grid item>
                  <Link component={RouterLink} to={'/signup'} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
