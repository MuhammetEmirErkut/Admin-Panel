import React from 'react';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { sha256 } from 'js-sha256';

const validationSchema = Yup.object({
  firstName: Yup.string().required("* Required field"),
  lastName: Yup.string().required("* Required field"),
  nickname: Yup.string().required("* Required field"),
  department: Yup.string().required("* Required field"),
  oldPassword: Yup.string().required("* Required field"),
  password: Yup.string().required("* Required field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], '* Passwords must match')
    .required('* Required field'),
});

const EditProfile = ({ user }) => {
  const handleUpdate = async (values, { setSubmitting, setErrors }) => {
    const hashedOldPassword = sha256(values.oldPassword).toString();

    if (user.password !== hashedOldPassword) {
      setErrors({ oldPassword: '* Old password is incorrect' });
      setSubmitting(false);
      return;
    }

    try {
      const hashedNewPassword = sha256(values.password).toString();
      const updatedUser = { 
        name: values.firstName, 
        surname: values.lastName, 
        nickname: values.nickname, 
        department: values.department, 
        password: hashedNewPassword 
      };

      await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, updatedUser);
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating student:', error);
    }

    setSubmitting(false);
  };

  const fields = [
    { as: TextField, name: 'firstName', label: 'First name', type: 'text' },
    { as: TextField, name: 'lastName', label: 'Last name', type: 'text' },
    { as: TextField, name: 'nickname', label: 'Nickname', type: 'text' },
  ];

  // Render a loading state or message if user data is not yet available
  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: user.name || '',
          lastName: user.surname || '',
          nickname: user.nickname || '',
          department: user.department || '',
          oldPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ errors, touched, values, setFieldValue, isSubmitting }) => (
          <Form className='justify-content-between m-2 p-1 align-items-center'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {fields.map((field) => (
                <Box key={field.name} sx={{ flex: '1 1 30%', minWidth: '200px', m: 1 }}>
                  <Field
                    as={field.as}
                    id={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    {...field}
                    variant="outlined"
                    value={values[field.name]}
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
                    fullWidth
                  />
                </Box>
              ))}
              <Box key={'oldPassword'} sx={{ flex: '1 1 30%', minWidth: '200px', m: 1 }}>
                <Field
                  as={TextField}
                  id={'oldPassword'}
                  name={'oldPassword'}
                  label={'Old Password'}
                  type={'password'}
                  variant="outlined"
                  value={values['oldPassword']}
                  error={touched['oldPassword'] && Boolean(errors['oldPassword'])}
                  helperText={touched['oldPassword'] && errors['oldPassword']}
                  fullWidth
                />
              </Box>
              <Box key={'password'} sx={{ flex: '1 1 30%', minWidth: '200px', m: 1 }}>
                <Field
                  as={TextField}
                  id={'password'}
                  name={'password'}
                  label={'New Password'}
                  type={'password'}
                  variant="outlined"
                  value={values['password']}
                  error={touched['password'] && Boolean(errors['password'])}
                  helperText={touched['password'] && errors['password']}
                  fullWidth
                />
              </Box>
              <Box key={'confirmPassword'} sx={{ flex: '1 1 30%', minWidth: '200px', m: 1 }}>
                <Field
                  as={TextField}
                  id={'confirmPassword'}
                  name={'confirmPassword'}
                  label={'Confirm Password'}
                  type={'password'}
                  variant="outlined"
                  value={values['confirmPassword']}
                  error={touched['confirmPassword'] && Boolean(errors['confirmPassword'])}
                  helperText={touched['confirmPassword'] && errors['confirmPassword']}
                  fullWidth
                />
              </Box>
              <Box key={'department'} sx={{ flex: '1 1 30%', minWidth: '200px', m: 1 }}>
                <FormControl fullWidth variant="outlined" error={touched['department'] && Boolean(errors['department'])}>
                  <InputLabel id={`department-label`}>{'Department'}</InputLabel>
                  <Select
                    labelId={`department-label`}
                    id={'department'}
                    name={'department'}
                    value={values['department']}
                    onChange={(e) => {
                      const { value } = e.target;
                      setFieldValue('department', value);
                    }}
                    label={'Department'}
                  >
                    <MenuItem value="health">Health Sciences</MenuItem>
                    <MenuItem value="engineering-natural">Engineering & Natural Sciences</MenuItem>
                    <MenuItem value="science-literature">Science & Literature</MenuItem>
                  </Select>
                  {touched['department'] && errors['department'] && <Typography color="error">{errors['department']}</Typography>}
                </FormControl>
              </Box>
            </Box>
            <Button
              className='rounded-2 m-2 p-2'
              type='submit'
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Save'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
