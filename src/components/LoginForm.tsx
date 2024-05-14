import React, { useCallback, useMemo } from 'react';
import './LoginForm.css';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

function LoginForm() {
  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      console.log(values);
    },
    [],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Pole nie może być puste!'),
        password: yup
          .string()
          .required('Pole nie może być puste!')
          .min(5, 'Hasło nie może być krótsze niż 5 znaków!'),
      }),
    [],
  );

  return (
      <div>
          <div id="rectangle1"></div>
          <div id="text">Twój napis tutaj</div>

          <Formik
              initialValues={{username: '', password: ''}}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
          >
              {(formik: any) => (
                  <form
                      className="Login-form"
                      id="signForm"
                      noValidate
                      onSubmit={formik.handleSubmit}
                  >
                      <TextField
                          id="username"
                          name="username"
                          label="Nazwa utkownika"
                          variant="standard"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.username && !!formik.errors.username}
                          helperText={formik.touched.username && formik.errors.username}
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
                          component={Link}
                          to="/list"
                          sx={{ m: 1 }}
                          type="submit"
                          disabled={!(formik.isValid && formik.dirty)}
                      >
                          Zaloguj się
                      </Button>
                  </form>
              )}
          </Formik>
      </div>
  );
}

export default LoginForm;
