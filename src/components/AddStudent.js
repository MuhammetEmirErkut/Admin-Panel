import React from 'react';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
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

const AddStudent = ({ handleUpdateGrid }) => {
    const { dispatch } = useStudent();

    const handleSubmit = async (values, { resetForm }) => {
        const addStudent = {
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
        };

        console.log('Submitting student:', addStudent);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/students`, addStudent);
            console.log('Response:', response);
            dispatch({ type: "ADD_STUDENT", payload: response.data });
            handleUpdateGrid();
            resetForm();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fields = [
        { name: 'firstName', label: 'First name', type: 'text' },
        { name: 'lastName', label: 'Last name', type: 'text' },
        { name: 'age', label: 'Age', type: 'number' },
        
    ];

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', age: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, values }) => (
                <Form className='d-flex m-2 p-1 align-items-center'>
                    {fields.map(field => (
                        <Field
                            key={field.name}
                            as={TextField}
                            className='m-1 p-1'
                            id={field.name}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            variant="outlined"
                            value={values[field.name]}
                            error={touched[field.name] && Boolean(errors[field.name])}
                            helperText={touched[field.name] && errors[field.name]}
                        />
                    ))}
                    <button className='rounded-2 m-3 p-2' type='submit'>
                        <SaveIcon />
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddStudent;
