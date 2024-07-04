import { Box, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Layout/Sidebar'
import AddStudent from '../components/AddStudent';


function Profile() {
    return (
        <>
            <Box sx={{ display: "flex" , backgroundColor: '#fafafa'}}>
                <Sidebar/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" , backgroundColor: '#fafafa'}}>
                         
                    </Box>               
            </Box>
        </>

    )
}
export default Profile;