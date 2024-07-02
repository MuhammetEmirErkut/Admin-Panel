import React, { useState } from 'react';
import { useUser } from '../context';
import '../bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().required("* Required field"),
  surname: Yup.string().required("* Required field"),
  nickname: Yup.string().required("* Required field"),
  department: Yup.string().required("* Required field"),
  password: Yup.string().required("* Required field"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], '* Passwords must match').required('* Required field')
});

const SignIn = () => {
  const { dispatch } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const hashedPassword = sha256(values.password).toString();

    const registerUser = { 
      name: values.name, 
      surname: values.surname, 
      nickname: values.nickname, 
      department: values.department, 
      password: hashedPassword 
    };
    try {
      const response = await axios.post('http://localhost:3000/users', registerUser);
      dispatch({ type: "REGISTER_USER", payload: response.data });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', surname: '', nickname: '', department: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, errors }) => (  //?
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card" style={{width: "700px"}}>
            <div className="card-header text-center">
              <h4>Sign In</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                  <div className="col">
                    <div className='d-flex justify-content-between align-items-end'>
                      <label htmlFor="name">Name:</label>
                      {errors.name && <div className="border border-danger bg-light text-danger p-1 rounded-2">{errors.name}</div>}
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      className="form-control mt-2 mb-1 w-100"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <div className='d-flex justify-content-between align-items-end'>
                      <label htmlFor="surname">Surname:</label>
                      {errors.surname && <div className="border border-danger bg-light text-danger p-1 rounded-2">{errors.surname}</div>}
                    </div>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder="Enter Surname"
                      className="form-control mt-2 mb-1"
                      value={values.surname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <div className='d-flex justify-content-between align-items-end'>
                      <label htmlFor="nickname">Nickname:</label>
                      {errors.nickname && <div className="border border-danger bg-light text-danger p-1 rounded-2">{errors.nickname}</div>}
                    </div>
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      placeholder="Enter Nickname"
                      className="form-control mt-2 mb-1"
                      value={values.nickname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <div className='d-flex justify-content-between align-items-end'>
                      <label htmlFor="department">Department:</label>
                      {errors.department && <div className="border border-danger bg-light text-danger p-1 rounded-2">{errors.department}</div>}
                    </div>
                    <select
                      name="department"
                      id="department"
                      className="form-control mt-2 mb-1"
                      value={values.department}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select Department</option>
                      <option value="health">Health Sciences</option>
                      <option value="engineering-natural">Engineering & Natural Sciences</option>
                      <option value="science-literature">Science & Literature</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col">
                    <div className='d-flex justify-content-between align-items-end'>
                      <label htmlFor="password">Password:</label>
                      {errors.password && <div className="border border-danger bg-light text-danger p-1 rounded-2">{errors.password}</div>}
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      className="form-control mt-2 mb-1"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <div className='d-flex justify-content-between align-items-end'>
                      <label htmlFor="confirmPassword">Password:</label>
                      {errors.confirmPassword && <div className="border border-danger bg-light text-danger p-1 rounded-2">{errors.confirmPassword}</div>}
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control mt-2 mb-1"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button className="btn btn-success btn-block mt-3 d-block w-100" type="submit">
                  Sign In
                </button>
              </form>
            </div>
            <p className="d-flex justify-content-center align-items-center">
              Go to the{" "}&nbsp;
              <Link to={'/login/*'}>Login</Link>
              &nbsp;Screen
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;
