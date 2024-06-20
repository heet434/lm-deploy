import React from 'react';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/system';

interface Course {
  course_code: string;
  course_title: string;
  semester_type: string;
  semester_year: number;
  instructor_rg_no: number;
  total_students: number;
  total_lectures: number;
}

interface InstructorCoursesDetailsProps {
  courses: Course[];
}

const CenteredPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto', // Center the paper horizontally
  maxWidth: 800, // Limit width for better readability
  position: 'relative',
  top: '20vh',
}));

const InstructorCoursesDetails: React.FC<InstructorCoursesDetailsProps> = ({ courses }) => {
  return (
    <CenteredPaper>
      <Typography variant="h4" gutterBottom align="center">
        Courses Taught
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Code</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Total Students</TableCell>
              <TableCell>Total Lectures</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.course_code}>
                <TableCell>{course.course_code}</TableCell>
                <TableCell>{course.course_title}</TableCell>
                <TableCell>{course.semester_type}</TableCell>
                <TableCell>{course.semester_year}</TableCell>
                <TableCell>{course.total_students}</TableCell>
                <TableCell>{course.total_lectures}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CenteredPaper>
  );
};

export default InstructorCoursesDetails;
