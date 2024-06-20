import {useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import UserProfile from './UserProfile';
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from 'axios';
import ViewUser from './ViewUser';
import { Button } from '@mui/material';
import Leave from './Leave';
import ShowLeaves from './ShowLeaves';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCardIcon from '@mui/icons-material/AddCard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookIcon from '@mui/icons-material/Book';
import ViewCourses from './ViewCoursesStudent';
import env from 'react-dotenv';
// get BACKEND_PORT from .env file

const BACKEND_PORT = 'https://leavemanagement-production.up.railway.app';

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

const LoadingComponent = () => <div>Loading...</div>;

const drawerWidth: number = 200;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
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

const LeaveComponent = ({studentData, selectedDate, dataChange, setDataChange, handleDateChange}:any) => {
  return (
    <div style={{width: '100%'}}>
        <Paper
          sx={{
            position: 'relative',
            // border: '4px solid #ccc',
            // padding: '0.5rem',
            borderRadius: '8px',
            width: '95%',
            height: 'fit-content',
            margin: '0 auto',
            mb : 1
        }}
        >
            <ShowLeaves data={{leaves : [studentData.leaveData], selectedDate: selectedDate, changeDate : handleDateChange}}/>
        </Paper>
        <Paper
          sx={{
            position: 'relative',
            // border: '4px solid #ccc',
            // padding: '0.5rem',
            borderRadius: '8px',
            width: '95%',
            height: 'fit-content',
            margin: '0 auto',
            mb: 1
        }}
        >
          <Leave data={{leaves: studentData.leaveData, selectedDate: selectedDate, dataChange, setDataChange}}/>
        </Paper>
      </div> 
  );
}

const AttendanceComponent = () => {
  return (
    <div>
      <h1>Attendance</h1>
    </div>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


// The props passed to Student component are userLoginUtility which contains functions to log the user in and out, 
// as well as a variable to check if the user is logged in.

export default function Student({userLoginUtility}: {userLoginUtility: any}) {
    
  // Setting the interface for studentData
    interface studentData {
        studentData: {
            studentData: {
                roll_no: number;
                name: string;
                branch: string;
                stream: string;
                joining_year: number;
            };
            leaveData: [{
                leave_id: number;
                leave_date: number;
                reason: string;
                user_id: number;
                user_role: string;
                status: string;
                course_code: string;
            }];
            enrollmentData: [{
                roll_no: number;
                course_code: string;
                leave_percentage: number;
            }];
        }
    }

    // Secure the route
    const navigate = useNavigate();
    useEffect(() => {
        if(!userLoginUtility.getUserStatus()){
            alert("User is not logged in, please sign in to continue.");
            navigate('/');
        }
    }, []);

    // Data states
    const [dataChange, setDataChange] = React.useState(false);
    const [studentData, setStudentData] = React.useState<any>(null); // Initialize as null

    const [component, setComponent] = React.useState('leave');

    // Fetch student data
    const fetchData = async () => {
      try {
        const user_id = UserProfile.getUserName();
        const response = await axios.get(`${BACKEND_PORT}/studentData`, { params: { user_id } });
        setStudentData(response.data);
      } catch (error) {
        console.error('Cannot get Student Data', error);
      }
    };
    // Fetch student data on component mount
    React.useEffect(() => {
      fetchData(); // Fetch data
    }, []);

    // Looking for changes in data to update states
    if(dataChange){
      fetchData();
      setDataChange(false);
    }

    // Other States
    const [open, setOpen] = React.useState(true);
      const toggleDrawer = () => {
      setOpen(!open);
      };
      const [openUser, setOpenUser] = React.useState(false);

      const [selectedDate, setSelectedDate] = React.useState("2024-04-02");
      const handleDateChange = (date: string) => {
          setSelectedDate(date);
      }

    // If data is still loading, render the loading component
    if (!studentData) {
      return <LoadingComponent />;
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ 
        display: 'flex'
      }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '20px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
               Welcome {studentData.studentData.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              borderBottom: '1px solid rgba(0,0,0,0.4)',
              mb: '10px',
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'flex-end',
              px: [1],
            }}
          > 
            <Button style={{ width: '100%' }} onClick={() => setOpenUser(!openUser)}>
                {openUser ? 'View Dashboard' : 'View User'}
            </Button>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'flex-end',
              px: [1],
            }}
          > 
            <Button style={{ width: '100%', color: 'rgba(0,0,0,0.5)', margin: 'auto'}} onClick= {() => setComponent('leave')}>
              {open ?<><AddCardIcon/>-Apply Leave</> : <AddCardIcon />}
            </Button>
          </Toolbar>
          {/* <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'flex-end',
              px: [1],
            }}
          > 
            <Button style={{ width: '100%', color: 'rgba(0,0,0,0.5)', margin: 'auto'}} onClick={() => setComponent('attendance')}>
            {open ?<><EventNoteIcon/>-Attendance</> : <EventNoteIcon />}
            </Button>
          </Toolbar> */}
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'flex-end',
              px: [1],
            }}
          > 
            <Button style={{ width: '100%', color: 'rgba(0,0,0,0.5)'}} onClick= {() => setComponent('course')}>
              {open ? <><BookIcon/>-View Courses</> : <BookIcon />}
            </Button>
          </Toolbar>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 10,
              transform: 'translateX(-50%)',
              left: '50%',
              borderRadius: '5%',
              backgroundColor: 'rgba(255,50,50,0.2)',
              color: 'black',
              width: '60%',
            }}
            onClick={() => {
              userLoginUtility.logUserOut();
              navigate('/');
            }}
          >
            {open ? <><LogoutIcon/>Logout</> : <LogoutIcon />}
          </IconButton>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            backgroundImage: 'url(https://picsum.photos/1500/1500)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            {openUser ? <ViewUser user = {{userData: studentData.studentData,isOpen: openUser, role: 'student'}}/> : null}
            {!openUser ?<>
              {component === 'leave' ?
              <LeaveComponent studentData={studentData} selectedDate={selectedDate} dataChange={dataChange} setDataChange={setDataChange} handleDateChange={handleDateChange}/>
              : component==='course'?
              <ViewCourses courses={studentData.enrollmentData}/>
                : <AttendanceComponent />
              }
            </>: null}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}