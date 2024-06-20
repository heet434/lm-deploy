import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import React, { useState } from 'react';

interface Leave {
    leave_id: number;
    leave_date: string;
    reason: string;
    user_id: number;
    user_role: string;
    status: string;
    course_code: string;
}

// interface selectedDate {
//   selectedDate: dayjs.Dayjs;
// }

interface CalendarProps {
  data: {
      leaves: Leave[][],
      selectedDate: string,
      changeDate: (date: string) => void
  }
}

const CalendarComponent: React.FC<CalendarProps> = ({ data }) => {
    //console.log(data)
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-04-02'));

    const parseLeaveDates = (leaveDate: string) => {
      const formattedDate = dayjs(leaveDate).format('YYYY-MM-DD');
      return formattedDate;
    }

    const getLeaveDates = () => {
      const dates: Record<string, string> = {};
      data.leaves[0].forEach((leave) => {
          const date = dayjs(parseLeaveDates(leave.leave_date));
          dates[date.format('YYYY-MM-DD')] = leave.status;
      });
        return dates;
    };

    const leaveDates = getLeaveDates();

    const cellRender = (date: Dayjs) => {
      const dateString = date.format('YYYY-MM-DD');
      const status = leaveDates[dateString as keyof typeof leaveDates];
  
      if (status === 'rejected') {
          return <div style={{ backgroundColor: 'red', color: 'white', textAlign: 'center' }}>Rejected Leave</div>;
      } else if (status === 'accepted') {
          return <div style={{ backgroundColor: 'green', color: 'white', textAlign: 'center'  }}>Accepted Leave</div>;
      } else if (status === 'pending') {
          return <div style={{ backgroundColor: 'yellow', textAlign: 'center'  }}>Pending Leave</div>;
      } else {
          // Render default cell content only if it's not a leave date
          return null;
      }
    };
  
  
  

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
        data.changeDate(newValue.format('YYYY-MM-DD'));
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    return (
        <>
            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                cellRender={cellRender}
            />
        </>
    );
};

export default CalendarComponent;
