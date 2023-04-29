import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Skeleton } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BasicInfoCard from 'src/components/shared/BasicInfoCard';
import { axiosInstance } from '../../config/axiosInterceptors';

// const basicUserData = {
//   "Name": "Yash Kulkarni",
//   "Height": "190cm",
//   "Weight": "80kg",
//   "Blood Group": "O+",
//   "Age": "17",
//   "Sex": "Male",
//   "profilePic": { avatar },
//   "Allergies": "Eye Allergies (Allergic Conjunctivitis), Nasal Allergies (Rhinitis), Sinusitis, Skin Allergies",
//   "MajorCond": "Dementia",
//   "mob": "+91 9087654321",
//   "email": "kulkarni@gmail.com",
//   "emerCon": "+91 9990008888",
//   "add": "2nd street",
//   "city": "Mumbai",
//   "state": "Maharashtra",
//   "pincode": "400001"
// }

const BasicProfile = () => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState()

  useEffect(() => {
    const ayurId = localStorage.getItem('ayurId')
    console.log(ayurId)
    setLoading(true)
    axiosInstance.get(`/${ayurId}`)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })

  }, [])

  return (
    <PageContainer title="Dashboard" description="Ayur Dashboard">
      <Box>
        {loading ? <Box>
          <Skeleton variant="rectangular" height="30vh" width="65vw" sx={{marginBottom: "2rem"}}/>
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="15vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="25vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="15vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="25vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="15vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="25vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="25vw"/> 
          <Skeleton variant='h5' sx={{marginBottom: "2rem"}} width="25vw"/> 
        </Box> :
          <Grid container spacing={2} direction="column">
            {/* Basic Info Sec  */}
            <Grid item>
              <BasicInfoCard userData={userData} />
            </Grid>

            {/* Allergies */}
            <Grid item m={2}>
              <Typography variant="h5" mb={1}>Allergies</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: "2rem" }}>
                {userData?.allergies?.map((item, index) => {
                  return (<Typography variant='h6' key={index}>{item}</Typography>)
                })}
              </Box>
            </Grid>

            {/* Main Condition */}
            <Grid item m={2}>
              <Typography variant="h5" mb={1}>Major Condition</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: "2rem" }}>
                {userData?.major_problems?.map((item, index) => {
                  return (<Typography variant='h6' key={index}>{item}</Typography>)
                })}
              </Box>
            </Grid>

            {/* Contact Information */}
            <Grid item m={2}>
              <Typography variant="h5" mb={1}>Contact Information</Typography>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}><Typography variant="h6">Mobile: {userData?.phone_number}</Typography></Grid>
                <Grid item md={6} xs={12} direction="row"><Typography variant="h6">Emergency Contact:</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: "2rem" }}>
                  {userData?.emergency_contact_number?.map((item, index) => {
                    return (<Typography variant='h6' key={index}>{item}</Typography>)
                  })}
                </Box></Grid>
                <Grid item md={6} xs={12}><Typography variant="h6">Email: {userData?.email_id}</Typography></Grid>
              </Grid>
            </Grid>

            {/* Address Information */}
            {/* <Grid item m={2}>
          <Typography variant="h5" mb={1}>Address Information</Typography>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}><Typography variant="h6">Address: {basicUserData.add}</Typography></Grid>
            <Grid item md={6} xs={12}><Typography variant="h6">State: {basicUserData.state}</Typography></Grid>
            <Grid item md={6} xs={12}><Typography variant="h6">City: {basicUserData.city}</Typography></Grid>
            <Grid item md={6} xs={12}><Typography variant="h6">Pincode: {basicUserData.pincode}</Typography></Grid>
          </Grid>
        </Grid> */}
          </Grid>}
        {/* Main Container  */}

      </Box>
    </PageContainer>
  );
};

export default BasicProfile
