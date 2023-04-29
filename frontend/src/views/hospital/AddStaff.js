import React, { useEffect, useState } from 'react'
import PageContainer from 'src/components/container/PageContainer'
import { Box, Button, Dialog, DialogContent, Autocomplete, TextField, DialogTitle, Stack, Typography } from "@mui/material"
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { DataGrid } from '@mui/x-data-grid'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { axiosInstance } from '../../config/axiosInterceptors'

const columns = [
  { field: 'doctor_id', headerName: "Doctor ID", width: 125 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'sex', headerName: 'Sex', width: 90 },
  { field: 'speciality', headerName: 'Speciality', width: 250 },
  { field: 'registration_no', headerName: 'Registration Number', width: 150 },
]

const rows = [
  { doctor_id: '908808708608', name: "Aryan", sex: "Male", speciality: "Gyno", registration_no: '1234567890' },
  { doctor_id: '945632718901', name: "Arayaman", sex: "Male", speciality: "Ortho", registration_no: '273547112' },
  { doctor_id: '192827364501', name: "Shubhi", sex: "Female", speciality: "Dentist", registration_no: '174618746' },
  { doctor_id: '735624183943', name: "Shweta", sex: "Female", speciality: "Gyno", registration_no: '3418413934' },
  { doctor_id: '134146327432', name: "Tanya", sex: "Female", speciality: "Ortho", registration_no: '4143465757' },
]

const AddStaff = () => {
  const [open, setOpen] = useState(false)
  // const [rows, setRows] = useState([])
  const handleClose = () => {
    setOpen(false);
    
  };

  const sexOptions= [
    {label: "M"},
    {label: "F"},
  ]

  const validationSchema = yup.object({
    name: yup
      .string('Enter the name of the Staff')
      .required('Staff Name is required'),
    registration_no: yup
      .string('Enter registration number')
      .required('Registration number is required'),
    sex: yup
      .string('Enter the gender of the staff')
      .required('Gender is required'),
    speciality: yup
      .string('Enter Speciality')
      .required('Speciality is required'),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      registration_no: '',
      sex: '',
      speciality: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const docData = {
        ...formik.values,
        speciality: [formik?.values?.speciality]
      }
      console.log("Reaching onSubmit", formik.values)
      try {
        const { data } = await axiosInstance.post("http://localhost/hospital/staff", docData)
        console.log(data)
        // setRows(data)
      } catch (err) {
        console.log(err)
      }
    }
  })

  return (
    <PageContainer>
      <Box display="flex" flexDirection="column">
        {/* Add Staff Button */}
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" onClick={() => setOpen(true)}>Add Staff</Button>
        </Box>
        {/* Listings of Staff */}
        <Box>
          <DataGrid
            columns={columns}
            rows={rows}
            disableRowSelectionOnClick
            getRowId={(row) => row.registration_no}
            hideFooterPagination
          />
        </Box>
      </Box>

      {open ? <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add a new Staff</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Box>
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='username' mb="5px">Staff's Name</Typography>
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
              <Box mt="25px">
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='username' mb="5px">Sex</Typography>
                <Autocomplete
                  id="gender"
                  options={sexOptions} 
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
                {/* <CustomTextField name="sex" variant="outlined" fullWidth value={formik.values.sex}
                  onChange={formik.handleChange}
                  error={formik.touched.sex && Boolean(formik.errors.sex)}
                  helperText={formik.touched.sex && formik.errors.sex} /> */}
              </Box>
              <Box my="25px">
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='username' mb="5px">Speciality</Typography>
                <CustomTextField name="speciality" variant="outlined" fullWidth value={formik.values.speciality}
                  onChange={formik.handleChange}
                  error={formik.touched.speciality && Boolean(formik.errors.speciality)}
                  helperText={formik.touched.speciality && formik.errors.speciality} />
              </Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
              >
                Add the Staff
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog> : null}
    </PageContainer>)
}
export default AddStaff