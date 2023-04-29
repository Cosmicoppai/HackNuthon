import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  IconButton,
  ListItemText,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import avatar from '../../assets/images/profile/pngwing.com.png';
import BasicInfoCard from 'src/components/shared/BasicInfoCard';
import { bytesToSize, FileDropzone } from 'src/components/shared/file-dropzone';
import { Close, ContentCopy, Upload } from '@mui/icons-material';
import * as yup from 'yup';
import { axiosInstance } from 'src/config/axiosInterceptors';
import { useNavigate } from 'react-router';
import axios from 'axios';

const currencies = [
  {
    value: 'USD',
    label: 'Doctor 1',
  },
  {
    value: 'EUR',
    label: 'Doctor 2',
  },
  {
    value: 'BTC',
    label: 'Doctor 3',
  },
  {
    value: 'JPY',
    label: 'Doctor 4',
  },
];

const AddRecord = () => {
  const [files, setFiles] = useState([]);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles([]);
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const validationSchema = yup.object({
    reason_of_visit: yup.string('Enter your Reason').required('Reason is required'),
  });

  const formik = useFormik({
    initialValues: {
      reason_of_visit: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let formdata = new FormData();
      formdata.append('reason_of_visit', values.reason_of_visit);
      formdata.append('deduction', values.deduction);
      formdata.append('password', values.deduction);

      files?.map((file) => {
        formdata.append('scan', file);
      });

      console.log(formdata);
      let ayurId = localStorage.getItem('ayurId');

      // if (!ayurId) return;

      try {
        const { data } = await axiosInstance.post(`/${ayurId}/checkup`, formdata, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        navigate('/user/records');
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(formik.values);
  console.log(formik.errors);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const onRemove = (file) => {
    const newFiles = [...files];
    newFiles.splice(file, 1);
    setFiles(newFiles);
  };

  console.log(formik.values);

  useEffect(() => {
    const ayurId = localStorage.getItem('ayurId')
    console.log(ayurId)
    axiosInstance.get(`/${ayurId}`)
      .then((res) => {
        console.log(res)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" ml={2} mb={2}>
          Add Record
        </Typography>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>

      {/* Basic information Section  */}
      <BasicInfoCard userData={userData}/>
      <Card sx={{ margin: '2rem 0' }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5">Form</Typography>
              <Typography variant="h5">Hospital Id: 3284asda123adsd</Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password" sx={{ width: '100%' }}>
                  Reason of Visit
                </InputLabel>
                <OutlinedInput
                  name="reason_of_visit"
                  value={formik.values.reason_of_visit}
                  onChange={formik.handleChange}
                  error={formik.touched.reason_of_visit && Boolean(formik.errors.reason_of_visit)}
                  helperText={formik.touched.reason_of_visit && formik.errors.reason_of_visit}
                  id="outlined-adornment-password"
                  type="text"
                  label="Reason of visit"
                />
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel htmlFor="outlined-adornment-password" sx={{ width: '100%' }}>
                  Next Checkup
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  label="next checkup"
                  value={formik.values.next_visit_date}
                  onChange={formik.handleChange}
                  error={formik.touched.next_visit_date && Boolean(formik.errors.next_visit_date)}
                  helperText={formik.touched.next_visit_date && formik.errors.next_visit_date}
                  name="next_visit_date"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  value={formik.values.deduction}
                  name="deduction"
                  onChange={formik.handleChange}
                  error={formik.touched.deduction && Boolean(formik.errors.deduction)}
                  helperText={formik.touched.deduction && formik.errors.deduction}
                  id="outlined-multiline-flexible"
                  label="Summary"
                  multiline
                  rows={4}
                  sx={{ width: '100%' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => setOpen(true)}
                startIcon={<Upload />}
              >
                Upload Scan
              </Button>
            </Grid>
            <Grid item xs={12}>
              {files.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <List>
                    {files.map((file) => (
                      <ListItem
                        key={file.path}
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          '& + &': {
                            mt: 1,
                          },
                        }}
                      >
                        <ListItemIcon>
                          <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          primaryTypographyProps={{
                            color: 'textPrimary',
                            variant: 'subtitle2',
                          }}
                          secondary={
                            typeof file.size === 'string' ? file.size : bytesToSize(file.size)
                          }
                        />
                        <Tooltip title="Remove">
                          <IconButton edge="end" onClick={() => onRemove && onRemove(file)}>
                            <Close fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        aria-describedby="customized-dialog-title"
      >
        <DialogTitle>Upload</DialogTitle>
        <DialogContent>
          <FileDropzone
            accept={['.png', '.jpg', '.jpeg', '.pdf']}
            files={files}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            maxFiles={10}
            onUpload={handleClose}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default AddRecord;