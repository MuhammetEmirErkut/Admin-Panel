import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
});

const UpdateStudent = ({ student, handleClose, handleUpdateGrid }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/students/${student.id}`, values);
            handleUpdateGrid();
            setSuccess(true);
            setTimeout(() => {
                setLoading(false)
                setSuccess(false);
                handleClose();
            }, 2000);

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
                        {success && (
                            <Alert variant="filled" severity="success">
                                Student updated successfully!
                            </Alert>
                        )}
                        <DialogContent>
                            {fields.map((field) => (
                                <Field
                                    as={TextField}
                                    key={field.name}
                                    name={field.name}
                                    type={field.type}
                                    {...field}
                                    margin="dense"
                                    label={field.label}
                                    fullWidth
                                    error={touched[field.name] && Boolean(errors[field.name])}
                                    helperText={touched[field.name] && errors[field.name]}
                                >
                                </Field>
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <LoadingButton loading={loading} type="submit" color="primary">Update</LoadingButton>
                        </DialogActions>
                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};

export default UpdateStudent;
