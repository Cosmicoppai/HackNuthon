import React from 'react'
import { Box, Typography, Card, CardHeader, CardContent, Stack, Autocomplete, TextField, Button } from "@mui/material"
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


const HospitalRegister = () => {
  const indianStates = [
    { label: 'Andhra Pradesh' },
    { label: 'Arunachal Pradesh' },
    { label: 'Assam' },
    { label: 'Bihar' },
    { label: 'Chhattisgarh' },
    { label: 'Goa' },
    { label: 'Gujarat' },
    { label: 'Haryana' },
    { label: 'Himachal Pradesh' },
    { label: 'Jharkhand' },
    { label: 'Karnataka' },
    { label: 'Kerala' },
    { label: 'Madhya Pradesh' },
    { label: 'Maharashtra' },
    { label: 'Manipur' },
    { label: 'Meghalaya' },
    { label: 'Mizoram' },
    { label: 'Nagaland' },
    { label: 'Odisha' },
    { label: 'Punjab' },
    { label: 'Rajasthan' },
    { label: 'Sikkim' },
    { label: 'Tamil Nadu' },
    { label: 'Telangana' },
    { label: 'Tripura' },
    { label: 'Uttar Pradesh' },
    { label: 'Uttarakhand' },
    { label: 'West Bengal' }
  ];
  const navigate= useNavigate()
  const validationSchema = yup.object({
    name: yup
      .string('Enter the name of the hospital')
      .required('Hospital Name is required'),
    registration_no: yup
      .string('Enter registration number')
      .required('Registration number is required'),

    district: yup
      .string('Enter name of the district')
      .required('District name is required'),
    city: yup
      .string('Enter city name')
      .required('City name is required'),
    landmark: yup
      .string('Enter a landmark'),
    pin_code: yup
      .string('Enter pincode')
      .max(6, 'Pincode should be of maximum 6 characters length')
      .min(4, 'Pincode should be of minimum 4 characters length')
      .required('Pincode is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      registration_no: '',
      state: { label: "" },
      district: '',
      city: '',
      landmark: '',
      pin_code: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const hospData = { ...formik.values, location: {
        state: formik.values.state.label,
        district: formik.values.district,
        city: formik.values.city,
        pin_code: formik.values.pin_code,
        landmark: formik.values.landmark,
      } }
      console.log("Reaching onSubmit", formik.values)
      try {
        const { data } = await axios.post("http://localhost/hospital/register", hospData)
        if (data) {
          toast.success(`${data.name} has been registered succesfully`)
          navigate('/auth/login')
          formik.resetForm()
        }
      } catch (err) {
        toast.error('Registration unsuccessful')
        console.log(err)
      }
    },
  });
  console.log(formik.errors)

  console.log({ ...formik.values, state: formik.values.state.label })
  return (

    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Card elevation={9} sx={{ px: 2, zIndex: 1, maxWidth: '600px' }}>
          <CardHeader title={<Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Logo />
            <Typography variant="h3">Hospital Registration</Typography>
          </Box>
          } />
          <CardContent>
            <Stack>
              <Box>
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='username' mb="5px">Name of the Hospital</Typography>
                <CustomTextField name="name" variant="outlined" fullWidth value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name} />
              </Box>
              <Box mt="25px">
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='username' mb="5px">Registration Number</Typography>
                <CustomTextField name="registration_no" variant="outlined" fullWidth value={formik.values.registration_no}
                  onChange={formik.handleChange}
                  error={formik.touched.registration_no && Boolean(formik.errors.registration_no)}
                  helperText={formik.touched.registration_no && formik.errors.registration_no} />
              </Box>

              {/* district and state */}
              <Stack justifyContent="space-between" direction="row" alignItems="center" mt={2} gap={2}>
                <Box width="100%">
                  <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">State</Typography>
                  <Autocomplete
                    id="indian-states"
                    options={indianStates}
                    getOptionLabel={(option) => option.label}
                    value={formik.values.state}
                    onChange={(e, values) => {
                      console.log(values)
                      formik.setFieldValue("state", values)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        variant="outlined"
                      />
                    )}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">District</Typography>
                  <CustomTextField name="district" variant="outlined" fullWidth value={formik.values.district}
                    onChange={formik.handleChange}
                    error={formik.touched.district && Boolean(formik.errors.district)}
                    helperText={formik.touched.district && formik.errors.district} />
                </Box>
              </Stack>

              {/* landmark */}
              <Box mt="25px">
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='password' mb="5px" >Landmark</Typography>
                <CustomTextField name="landmark" variant="outlined" fullWidth value={formik.values.landmark}
                  onChange={formik.handleChange}
                  error={formik.touched.landmark && Boolean(formik.errors.landmark)}
                  helperText={formik.touched.landmark && formik.errors.landmark} />
              </Box>

              {/* Pin and City */}
              <Stack justifyContent="space-between" direction="row" alignItems="center" my={2} gap={2}>
                <Box>
                  <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">City</Typography>
                  <CustomTextField name="city" variant="outlined" fullWidth value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city} />
                </Box>
                <Box>
                  <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Pincode</Typography>
                  <CustomTextField name="pin_code" variant="outlined" fullWidth value={formik.values.pin_code}
                    onChange={formik.handleChange}
                    error={formik.touched.pin_code && Boolean(formik.errors.pin_code)}
                    helperText={formik.touched.pin_code && formik.errors.pin_code} />
                </Box>
              </Stack>
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                >
                  Register
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </form>

  )

}

export default HospitalRegister