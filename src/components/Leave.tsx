// import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import AddLeave from './AddLeave';
import UserProfile from './UserProfile';

interface Leave {
    leave_id: number;
    leave_date: string;
    reason: string;
    user_id: number;
    user_role: string;
    status: string;
    course_code: string;
}

interface Props {
  data: {
      leaves: Leave[],
      selectedDate: string
      dataChange : boolean
      setDataChange : (dataChange: boolean) => void
  }
}

function showDateSpecs(isLeave: boolean, leaveData: Leave, dataChange: boolean, setDataChange: (dataChange: boolean) => void){
    if (isLeave) {
        return (
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                <div style={{ backgroundColor: 'rgba(23, 119, 208, 0.9)', color: 'white', padding: '10px', borderRadius: '5px 5px 0 0', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>Leave Details</div>
                <div style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Leave Date:</span> {dayjs(leaveData.leave_date).format('YYYY-MM-DD')}
                </div>
                <div style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Reason:</span> {leaveData.reason}
                </div>
                <div style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Status:</span> {leaveData.status}
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Leave in Course:</span> {leaveData.course_code}
                </div>
            </div>
        );
    } else {
        return <div style={{textAlign: 'center'}}>
            {/* <h2>Selected day not a leave.</h2> */}
            <AddLeave leave_date={leaveData.leave_date} user_id={leaveData.user_id} user_role={leaveData.user_role} dataChange={dataChange} setDataChange={setDataChange}/>
        </div>;
    }
}

const LeaveComponent: React.FC<Props> = ({ data }) => {
    
    var user_id = 0;
    var user_role = '';
    const getUserDetails = async () => {
        try {
            user_id = parseInt(UserProfile.getUserName());
            user_role = UserProfile.getRole();
          } catch (error) {
            console.error('Cannot get Student Data', error);
            // Handle error, e.g., logging, error reporting, etc.
          }
    }

    getUserDetails();
    const thisDate = {
        selectedDate: dayjs().format('YYYY-MM-DD'),
        isLeave: false,
        leaveData: {
            leave_id: 0,
            leave_date: '',
            reason: '',
            user_id: 0,
            user_role: '',
            status: '',
            course_code: ''
        }
    }
    thisDate.selectedDate = data.selectedDate;

    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-04-02'));

    const parseLeaveDates = (leaveDate: string) => {
      const formattedDate = dayjs(leaveDate).format('YYYY-MM-DD');
      //console.log(formattedDate);
      return formattedDate;
    }

    const checkDate = () => {
      const date: string = "";
      //console.log(data.leaves);
      var match = 0;
      data.leaves.forEach((leave) => {
          const date = parseLeaveDates(leave.leave_date);
          if (date === data.selectedDate) {
                thisDate.isLeave = true;
                thisDate.leaveData = leave;
                match = 1;
          }
      });
      if(match === 0){
        thisDate.isLeave = false;
        thisDate.leaveData = {
                leave_id: 0,
                leave_date: data.selectedDate,
                reason: '',
                user_id: user_id,
                user_role: user_role,
                status: 'pending',
                course_code: ''
            };
        }
    };
    


    return (
        checkDate(),
        //console.log(thisDate),
        showDateSpecs(thisDate.isLeave, thisDate.leaveData, data.dataChange, data.setDataChange)
    );
};

export default LeaveComponent;
