import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const AuthLogin = ({ title, subtitle, subtext }) => {

    useEffect(() => {
      localStorage.removeItem("userId")
    }, [])
    
    const navigate = useNavigate()
    const validationSchema = yup.object({
        username: yup
            .string('Enter your username')
            .required('Username is required'),
        password: yup
            .string('Enter your password')
            // .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            hospital_id: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const loginCreds = {
                ...formik.values,
                username: formik.values.username,
                password: formik.values.password,
                hospital_id: formik.values.hospital_id
            }
            try {
                const { data } = await axios.post("http://localhost/auth/login/hospital_staff", loginCreds,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                if (data?.access_token) {
                    localStorage.setItem("access_token", data?.access_token)
                    navigate("/hospital/admin")
                }

            } catch (error) {
                console.log(error)
            }
        },
    });

    console.log(formik.values)
    console.log(formik.errors)

    return <form onSubmit={formik.handleSubmit}>
        {
            title ? (
                <Typography fontWeight="700" variant="h2" mb={1} >
                    {title}
                </Typography >
            ) : null
        }

        {subtext}

        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                <CustomTextField id="username" name="username" variant="outlined" fullWidth value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username} />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password} />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Hospital Id</Typography>
                <CustomTextField id="hospital_id" name="hospital_id" variant="outlined" fullWidth value={formik.values.hospital_id}
                    onChange={formik.handleChange}
                    error={formik.touched.hospital_id && Boolean(formik.errors.hospital_id)}
                    helperText={formik.touched.hospital_id && formik.errors.hospital_id} />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack>
        </Stack>
        <Box>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
            >
                Sign In
            </Button>
        </Box>
        {subtitle}
    </form>
};

export default AuthLogin;
