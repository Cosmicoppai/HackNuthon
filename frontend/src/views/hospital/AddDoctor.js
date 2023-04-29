import React, { useEffect, useState } from 'react'
import PageContainer from 'src/components/container/PageContainer'
import { Box, Button, Dialog, DialogContent, Autocomplete, TextField, DialogTitle, Stack, Typography } from "@mui/material"
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { axiosInstance } from '../../config/axiosInterceptors'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

const columns = [
  { field: 'doctor_id', headerName: "Doctor ID", width: 125 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'sex', headerName: 'Sex', width: 90 },
  { field: 'speciality', headerName: 'Speciality', width: 250 },
  { field: 'registration_no', headerName: 'Registration Number', width: 150 },
]

const AddDoctor = () => {
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState([])
  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup
      .string('Enter the name of the Doctor')
      .required('Doctor Name is required'),
    registration_no: yup
      .string('Enter registration number')
      .required('Registration number is required'),
    sex: yup
      .string('Enter the gender of the doctor')
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
        const { data } = await axiosInstance.post("http://localhost/hospital/doctor", docData)
        console.log(data)
        if (data) {
          toast.success('Doctor added successfully')
          setOpen(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
  })

  const sexOptions = [
    "M",
    "F"
  ]

  useEffect(() => {
    axiosInstance.get("http://localhost/hospital/doctors")
      .then((resp) => {
        console.log(resp.data)
        setRows(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [open])

  return (
    <PageContainer>
      <Box display="flex" flexDirection="column">
        {/* Add Staff Doctor Button */}
        <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
          <Box ><Typography variant="h4">Doctor's List</Typography></Box>
          <Box display="flex">
            <Button variant="contained" onClick={() => setOpen(true)}>Add Doctor</Button>
          </Box>
        </Box>

        {/* Listings of Doctors */}
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
        <DialogTitle>Add a new Doctor</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Box>
                <Typography variant="subtitle1"
                  fontWeight={600} component="label" htmlFor='username' mb="5px">Doctor's Name</Typography>
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
                  id="sex"
                  options={sexOptions}
                  getOptionLabel={(option) => option}
                  value={formik.values.state}
                  onChange={(e, values) => {
                    console.log(values)
                    formik.setFieldValue("sex", values)
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
                Add the Doctor
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog> : null}
    </PageContainer>)
}

export default AddDoctor