import React, { useState } from 'react'
import { FormControl } from '@mui/base/FormControl';
// or
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object({
    name: Yup.string().required()
})


function AddStudent() {
    return (
        <div>
            <FormControl className='d-flex m-2 p-1 align-items-center' defaultValue="" required>
                <TextField className='m-1 p-1' id="outlined-basic" label="First name" variant="outlined" />
                <TextField className='m-1 p-1' id="outlined-basic" label="Last name" variant="outlined" />
                <TextField className='m-1 p-1' id="outlined-basic" label="Age" variant="outlined" />
                {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                <TextField id="standard-basic" label="Standard" variant="standard" /> */}
                <button className='rounded-2 m-3 p-2' type='submit'><SaveIcon /></button>
            </FormControl>
        </div>
    )
}

export default AddStudent;