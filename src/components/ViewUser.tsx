import React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography, Avatar } from '@mui/material';

interface User {
    userData: any;
    isOpen: boolean;
    role: string;
}

interface ViewUserProps {
    user: User;
}

const ViewUser: React.FC<ViewUserProps> = ({ user }) => {
    return (
        <Paper
            sx={{
                position: 'relative',
                top: 10,
                border: '4px solid #ccc',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '70%',
                margin: '0 auto',
            }}
        >
            <Box
                sx={{
                    padding: '2rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '80%',
                    margin: '0 auto',
                }}
            >
                <Avatar sx={{ width: '20vw', height: '20vw', mb: 2 }}>U</Avatar> {/* General user avatar */}
                <Typography variant="h3">User Details</Typography>
                {user.role === 'student'?
                <>
                    <Typography variant="h4">Roll No: <strong>{user.userData.roll_no}</strong></Typography>
                    <Typography variant="h4">Name: <strong>{user.userData.name}</strong></Typography>
                    <Typography variant="h4">Branch: <strong>{user.userData.branch}</strong></Typography>
                    <Typography variant="h4">Stream: <strong>{user.userData.stream}</strong></Typography>
                    <Typography variant="h4">Joining Year: <strong>{user.userData.joining_year}</strong></Typography></>
                :<>
                    <Typography variant="h4">Registeration No.: <strong>{user.userData.rg_no}</strong></Typography>
                    <Typography variant="h4">Name: <strong>{user.userData.name}</strong></Typography>
                    <Typography variant="h4">Department: <strong>{user.userData.dept}</strong></Typography>
                </>
                }
            </Box>
        </Paper>
    );
};

export default ViewUser;
