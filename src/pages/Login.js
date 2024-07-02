import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { sha256 } from 'js-sha256';

const validationSchema = Yup.object({
  nickname: Yup.string().required("* Required field"),
  password: Yup.string().required("* Required field"),
});

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const hashedPassword = sha256(values.password).toString();

    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;

      const user = users.find(
        user => user.nickname === values.nickname && user.password === hashedPassword
      );

      if (user) {
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/Main');
        }, 2000);
      } else {
        setMessage('');
        setErrors({ nickname: 'Invalid nickname or password', password: 'Invalid nickname or password' });
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ nickname: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, isSubmitting }) => ( // ?
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card" style={{ width: "400px" }}>
            <div className="card-header text-center">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              {message && <div className={`alert alert-${message.includes('successful') ? 'success' : 'danger'}`}>{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="d-flex justify-content-between align-items-end">
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
                <div className="form-group">
                  <div className="d-flex justify-content-between align-items-end">
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

                <button
                  className="btn btn-success"
                  type="submit"
                  style={{ display: "block", width: "100%", margin: "12px 0 0 0" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
            <p className="d-flex justify-content-center align-items-center">
              Go to the&nbsp;
              <Link to={'/signin'}>Sign In</Link>
              &nbsp;Screen
            </p>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
