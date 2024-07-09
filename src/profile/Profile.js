import React from 'react'
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useStudent } from '../context';
import axios from 'axios';

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
});

const Profile = () => {

    const fields = [
        { as: TextField, name: 'firstName', label: 'First name', type: 'text' },
        { as: TextField, name: 'lastName', label: 'Last name', type: 'text' },
        { as: TextField, name: 'nickname', label: 'Nickname', type: 'text' },
        { as: TextField, name: 'old-password', label: 'Old Password', type: 'password' },
        { as: TextField, name: 'new-password', label: 'New Password', type: 'password' },
        { as: TextField, name: 'confirm-new-password', label: 'Confirm Password', type: 'password' },
        { as: Select, name: 'department', label: 'Department', options: ['Health Sciences', 'Engineering & Natural Sciences', 'Science & Literature'] },
    ];

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        // Burada form verilerini sunucuya göndermek için axios'u kullanabilirsiniz
    };

    return (
        <>
            <Formik
                initialValues={{ firstName: '', lastName: '', age: '', gender: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Box sx={{ display: "flex", backgroundColor: '#fafafa' }}>
                        <Sidebar />
                        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px", backgroundColor: '#fafafa' }}>
                            <Form className='justify-content-between m-2 p-1 align-items-center'>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {fields.map((field, index) => (
                                        <Box key={field.name} sx={{ flex: '1 1 30%', minWidth: '200px', m: 1 }}>
                                            {field.as === Select ? (
                                                <FormControl fullWidth variant="outlined" error={touched[field.name] && Boolean(errors[field.name])}>
                                                    <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                                    <Select
                                                        labelId={`${field.name}-label`}
                                                        id={field.name}
                                                        name={field.name}
                                                        value={values[field.name]}
                                                        onChange={(e) => {
                                                            const { value } = e.target;
                                                            setFieldValue(field.name, value);
                                                        }}
                                                        label={field.label}
                                                    >
                                                        {field.options.map((option, index) => (
                                                            <MenuItem key={index} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                    {touched[field.name] && errors[field.name] && <Typography color="error">{errors[field.name]}</Typography>}
                                                </FormControl>
                                            ) : (
                                                <Field
                                                    as={field.as}
                                                    id={field.name}
                                                    name={field.name}
                                                    label={field.label}
                                                    type={field.type}
                                                    variant="outlined"
                                                    value={values[field.name]}
                                                    error={touched[field.name] && Boolean(errors[field.name])}
                                                    helperText={touched[field.name] && errors[field.name]}
                                                    fullWidth
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                                <button className='rounded-2 m-2 p-2' type='submit'>
                        <SaveIcon />
                    </button>
                            </Form>
                        </Box>
                    </Box>
                )}
            </Formik>
        </>
    )
}
export default Profile;
