import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import AddStudent from '../components/AddStudent';
import { StudentProvider } from '../context';
import axios from 'axios';

const Dashboard = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleUpdateGrid = async () => {
        try {
            const response = await axios.get('http://localhost:3000/students');
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/students');
                console.log(response.data);  // API verilerini kontrol et
                setRows(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'age', headerName: 'Age', type: 'number', width: 110 },
    ];

    return (
        <>
            <Box sx={{ display: "flex", backgroundColor: '#fafafa' }}>
                <Sidebar />

                <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: "85px", backgroundColor: '#fafafa' }}>
                    <Typography variant='h4'>
                        Dashboard Side
                    </Typography>
                    <Box sx={{ height: '800px', width: '95%', marginTop: '50px' }}>
                        <div className='bg-light rounded-2 border'>
                            <StudentProvider>
                                <AddStudent  handleUpdateGrid={handleUpdateGrid} />
                            </StudentProvider>

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
