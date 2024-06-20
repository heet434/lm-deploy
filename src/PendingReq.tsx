import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import env from 'react-dotenv';

// getting backend port from .env file
const BACKEND_PORT = 'https://leavemanagement-production.up.railway.app'

interface PendingReqProps {
  instructorData: {
    courseData: {
      course_code: string;
      course_title: string;
    }[];
  };
}

const PendingReq: React.FC<PendingReqProps> = ({ instructorData }) => {
  const [pendingLeavesInCourses, setPendingLeavesInCourses] = useState<any>(null);

  const fetchPendingRequests = async () => {
    const pendingLeavesInCourses1 = [];

    for (let i = 0; i < instructorData.courseData.length; i++) {
      const course_code = instructorData.courseData[i].course_code;
      const response = await axios.get(`${BACKEND_PORT}/getLeaves`, { params: { course_code } });

      const pendingLeaves = response.data.leaveData.filter((leave: any) => leave.status === 'pending');
      pendingLeavesInCourses1.push(pendingLeaves);
    }

    setPendingLeavesInCourses(pendingLeavesInCourses1);
  };

  useEffect(() => {
    fetchPendingRequests();
    //console.log(pendingLeavesInCourses);
  }, [instructorData.courseData]);

  const rejectLeave = async (leave_id : number) => {
    try {
      await axios.post(`${BACKEND_PORT}/rejectLeave`, {
        leave_id
      });

      // After successful rejection, refresh pending leaves
      fetchPendingRequests();
    } catch (error) {
      console.error('Failed to reject leave:', error);
    }
  };

  const approveLeave = async (leave_id: number) => {
    try {
      await axios.post(`${BACKEND_PORT}/approveLeave`, {
        leave_id
      });

      // After successful approval, refresh pending leaves
      fetchPendingRequests();
    } catch (error) {
      console.error('Failed to approve leave:', error);
    }
  };

  if (!pendingLeavesInCourses) return <div>Loading...</div>;

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10}>
        <Paper sx={{ p: 2, mt: 2, mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Pending Requests
          </Typography>
          {pendingLeavesInCourses.map((pendingLeaves: any, index: number) => (
            <Paper key={index} sx={{ p: 2, mt: 2 }}>
              <Typography variant="h4" gutterBottom>
                {instructorData.courseData[index].course_code} - {instructorData.courseData[index].course_title} : {pendingLeaves.length} pending requests
              </Typography>
              {pendingLeaves.map((leave: any, leaveIndex: number) => (
                <Paper key={leaveIndex} sx={{ p: 2, mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Date:</strong> {dayjs(leave.leave_date).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Roll No.: </strong> {leave.user_id}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Reason:</strong> {leave.reason}
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: 'rgba(3, 127, 252,0.7)' }}
                        onClick={() => approveLeave(leave.leave_id)}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ backgroundColor: 'rgba(252, 3, 3,0.7)' }}
                        onClick={() => rejectLeave(leave.leave_id)}
                      >
                        Reject
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Paper>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PendingReq;
