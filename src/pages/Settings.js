import { Box, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Layout/Sidebar'

export default function Settings() {
    return (
        <Box sx={{ display: "flex", backgroundColor: '#fafafa'}}>
            <Sidebar/>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px", backgroundColor: '#fafafa'}}>
                    <Typography variant='h4'>
                        Settings Side
                    </Typography>
                </Box>
        </Box>
    )
}
