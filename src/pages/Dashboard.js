import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import AddStudent from '../components/AddStudent';
import { StudentProvider } from '../context/context.js';
import axios from 'axios';
import UpdateStudent from '../components/UpdateStudent';
//Icons mui
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelecetedStudent] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleUpdateGrid = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/`);
            setRows(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(process.env.REACT_APP_API_URL);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
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

    const handleDelete = async () => {
        try {
            await Promise.all(
                selectedIds.map(id => axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`))
            );
            handleUpdateGrid();
            setSelectedIds([]);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'age', headerName: 'Age', type: 'number', width: 110 },
        {
            field: 'action',
            headerName: 'Actions',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => setSelecetedStudent(params.row)}
                >
                    <EditIcon/>
                </Button>
            )
        }
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
                                <AddStudent handleUpdateGrid={handleUpdateGrid} />
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
                                onRowSelectionModelChange={(ids) => {
                                    setSelectedIds(ids);
                                }}
                            />
                            <Button
                                variant='contained'
                                color='warning'
                                onClick={handleDelete}
                                disabled={selectedIds.length === 0}
                                style={{margin: '5px 5px 5px 20px', display: 'flex'}}
                            >
                                <DeleteIcon/>
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Box>
            {selectedStudent && (
                <UpdateStudent
                    student={selectedStudent}
                    handleClose={() => setSelecetedStudent(null)}
                    handleUpdateGrid={handleUpdateGrid}
                />
            )}
        </>
    );
};

export default Dashboard;
