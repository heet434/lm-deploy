import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Calendar from './Calendar';
import dayjs from 'dayjs';


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
//     selectedDate: dayjs.Dayjs;
// }

interface ShowLeavesProps {
    data: {
        leaves: Leave[][],
        selectedDate: string
        changeDate : (date: string) => void
    }
}

const ShowLeaves: React.FC<ShowLeavesProps> = ({data}) => {

    //console.log(leaves);
    return (
        <>
        {/* <TableContainer sx={{ width: '100%', height: 'fit-content', position: 'relative'}}>
                <Table sx={{ width: '100%', height: 'fit-content'}}>
                    
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Reason</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaves.map((leave) => (
                            <TableRow key={leave.leave_id}>
                                <TableCell>{}</TableCell>
                                <TableCell>{leave.reason}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </TableContainer> */}
        <Calendar data={data} />
        </>
    );
};

export default ShowLeaves;
