import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
});

const UpdateStudent = ({ student, handleClose, handleUpdateGrid }) => {
    const handleUpdate = async (values) => {
        try {
            await axios.put(`http://localhost:3000/students/${student.id}`, values);
            handleUpdateGrid();
            handleClose();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const fields = [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'age', label: 'Age', type: 'number' },
    ];

    return (
        <Formik
            initialValues={{ firstName: student.firstName, lastName: student.lastName, age: student.age }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleUpdate(values);
                setSubmitting(false);
            }}
        >
            {({ errors, touched, handleSubmit }) => (
                <Dialog open={true} onClose={handleClose}>
                    <DialogTitle>Update Student</DialogTitle>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            {fields.map((field) => (
                                <Field
                                    key={field.name}
                                    name={field.name}
                                    type={field.type}
                                >
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            margin="dense"
                                            label={field.name}
                                            fullWidth
                                            error={touched[field.name] && Boolean(errors[field.name])}
                                            helperText={touched[field.name] && errors[field.name]}
                                        />
                                    )}
                                </Field>
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" color="primary">Update</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};

export default UpdateStudent;
