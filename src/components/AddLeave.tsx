import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
//import CalendarComponent from './Calendar';

// get BACKEND_PORT from .env file
const BACKEND_PORT = env.REACT_APP_BACKEND_PORT;

interface Leave {
    leave_date: string;
    user_id: number;
    user_role: string;
    dataChange : boolean;
    setDataChange : (dataChange: boolean) => void;
}

const AddLeave: React.FC<Leave> = ({ leave_date, user_id, user_role, dataChange, setDataChange }) => {
    const [formData, setFormData] = useState({
        reason: '',
        course_code: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [userEnrollment, setUserEnrollment] = useState([{
        roll_no : 0,
        course_code: '',
        leave_percentage : 0.00
    }])
    useEffect(() => {
        const getEnrollmentDetails = async () => {
            try {
                const response = (await axios.get(`${BACKEND_PORT}/studentData`, { params: { user_id } }))
                //console.log(response)
                setUserEnrollment(response.data.enrollmentData)

            } catch (error) {
                console.error('Error:', error);
            }
        };
        getEnrollmentDetails();
    }   
    ,[]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataToSend = {
                ...formData,
                leave_date,
                user_id,
                user_role
            };
            //console.log(dataToSend)
            const response = await axios.post(`${BACKEND_PORT}/addLeave`, dataToSend);

            if (response.status === 200) {
                console.log('Leave added successfully');
                setDataChange(true);
                // Optionally, you can reset the form here
                setFormData({
                    reason: '',
                    course_code: ''
                });
            } else {
                console.error('Failed to add leave');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const percentages = userEnrollment.map((e,index)=>{
        if(e.roll_no == user_id){
            return (
                <p style={{ fontSize: '20px', color: '#007bff', fontWeight: 'bold', textAlign: 'center' }} key={index}>
                {e.course_code} : {e.leave_percentage}%
                </p>
            )
        }
    }

    )

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start',margin: '0 auto', padding: '50px'}}>
            <div style={{ marginRight: '100px', width: '70%' }}>
                <h2 style={{ marginBottom: '30px', color: '#333' }}>Add Leave</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', color: '#333' }}>Leave Date:</label>
                        <input type="text" value={leave_date} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', color: '#333' }}>User ID:</label>
                        <input type="text" value={user_id} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', color: '#333' }}>User Role:</label>
                        <input type="text" value={user_role} readOnly style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', color: '#333' }}>Reason:</label>
                        <textarea name="reason" value={formData.reason} onChange={handleChange} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '16px', color: '#333' }}>Course Code:</label>
                        <input type="text" name="course_code" value={formData.course_code} onChange={handleChange} required style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '12px 24px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Submit</button>
                </form>
            </div>
            <div style={{ width: '30%' }}>
                <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', border: '1px solid #ccc' }}>
                    <h3 style={{ marginBottom: '10px', color: '#333' }}>Current Leave Percentage</h3>
                    {percentages}
                </div>
            </div>
        </div>
    );
};

export default AddLeave;
