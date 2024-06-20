import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

interface Course {
  roll_no: number;
  course_code: string;
  leave_percentage: number;
}

interface StudentCoursesProps {
  courses: Course[];
}

const CourseCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  width: '350px',
  height: '200px', // Set card height
  textAlign: 'center',
  borderRadius: '12px',
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Gradient background based on theme colors
  color: theme.palette.primary.contrastText, // Text color based on primary theme color
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
    cursor: 'pointer',
  },
}));

const CenteredGridContainer = styled(Grid)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StudentCourses: React.FC<StudentCoursesProps> = ({ courses }) => {

  return (
    <CenteredGridContainer container spacing={3}>
      {courses.map((course, index) => (
        <Grid item key={index}>
          <CourseCard>
            <Typography variant="h6" gutterBottom>
              Course Code: {course.course_code}
            </Typography>
            <Typography variant="body1" sx={{
                marginTop: 5,
            }}>
              Roll Number: {course.roll_no}
            </Typography>
            <Typography variant="body2" color="inherit" sx={{
                position: 'relative',
                left: '50%',
                transform: 'translateX(-50%)',
                mt: 3,
            }}>
              Leave Percentage: {course.leave_percentage}%
            </Typography>
          </CourseCard>
        </Grid>
      ))}
    </CenteredGridContainer>
  );
};

export default StudentCourses;
