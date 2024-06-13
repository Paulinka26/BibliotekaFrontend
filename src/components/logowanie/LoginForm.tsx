import React, { useCallback } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function LoginForm() {
    const navigate = useNavigate();
    const apiClient = useApi();

    const onLoginSubmit = useCallback(
        (values: { login: string; password: string }, formik: any) => {
            apiClient.login(values).then((response) => {
                console.log(response);
                if (response.success) {
                    navigate('/selection');
                } else {
                    formik.setFieldError('login', 'Invalid username or password');
                }
            });
        },
        [apiClient, navigate]
    );

    const validationSchema = yup.object().shape({
        login: yup.string().required('Pole nie może być puste!'),
        password: yup.string().required('Pole nie może być puste!').min(5, 'Hasło nie może być krótsze niż 5 znaków!'),
    });

    return (
        <div>
            <h1>Zaloguj się do biblioteki</h1>
            <div className="login-panel">
                <Formik
                    initialValues={{ login: '', password: '' }}
                    onSubmit={onLoginSubmit}
                    validationSchema={validationSchema}
                    validateOnChange
                    validateOnBlur
                >
                    {(formik) => (
                        <form className="Login-form" id="loginForm" noValidate onSubmit={formik.handleSubmit}>
                            <TextField
                                id="login"
                                name="login"
                                label="Nazwa użytkownika"
                                variant="standard"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.login && !!formik.errors.login}
                                helperText={formik.touched.login && formik.errors.login}
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Hasło"
                                variant="standard"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && !!formik.errors.password}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                variant="contained"
                                sx={{ m: 1 }}
                                type="submit"
                                disabled={!(formik.isValid && formik.dirty)}
                            >
                                Zaloguj się
                            </Button>
                        </form>
                    )}
                </Formik>
                <Link to="/adduser" className="add-user-link">Dodaj użytkownika</Link>
            </div>
        </div>
    );
}

export default LoginForm;
