import { Box, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Layout/Sidebar'
import { DataGrid } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
];

function Dashboard() {
    return (
        <>
            <Box sx={{ display: "flex", backgroundColor: '#fafafa' }}>
                <Sidebar />
            
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px", backgroundColor: '#fafafa' }}>
                    <Typography variant='h4'>
                        Dashboard Side
                    </Typography>
                    <Box sx={{ height: '800px', width: '95%', marginTop: '50px' }}>
                        <div className='bg-light rounded-2 border'>
                            <button className='rounded-2 m-1 p-2'><SaveIcon /></button>
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

    )
}
export default Dashboard;