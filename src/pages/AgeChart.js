import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Layout/Sidebar'
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const AgeChart = () => {
    const [datas, setdatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
                setdatas(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    const ages = datas.map(student => student.age);
    const names = datas.map(student => student.firstName)

    return (
        <Box sx={{ display: "flex", backgroundColor: '#fafafa' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 15, marginTop: "55px", backgroundColor: '#fafafa' }}>
                <Typography variant='h4'>
                    <BarChart
                        series={[
                            { data: ages }
                        ]}
                        height={290}
                        xAxis={[{ data: names, scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 100 }}
                    />
                </Typography>
            </Box>
        </Box>
    )
}
export default AgeChart;
