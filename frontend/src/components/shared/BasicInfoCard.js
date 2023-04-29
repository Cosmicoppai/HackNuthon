import React from 'react'
import { Grid, Paper, Stack, Typography, Card, CardHeader, CardContent } from '@mui/material'
import avatar from "../../assets/images/profile/pngwing.com.png"
import Kanak from "../../assets/images/profile/WhatsApp Image 2023-04-24 at 17.12.42.jpg"

const BasicInfoCard = ({userData}) => {
  
  const calculateAge = () => {
    var today = new Date();
    var birthDate = new Date(userData?.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  
  console.log(userData)
  // const basicUserData = {
  //   "Name": "Kanak Chaudhari",
  //   "Height": "180cm",
  //   "Weight": "75kg",
  //   "Blood Group": "B+",
  //   "Age": calculateAge(),
  //   "Sex": "Male",
  //   "profilePic": {Kanak},
  // }
  const basicUserData = {
    "Name": userData?.name,
    "Height": userData?.height,
    "Weight": userData?.weight,
    "Blood Group": userData?.blood_group,
    "Age": calculateAge(),
    "Sex": userData?.sex,
    "profilePic": userData?.photo,
  }
  return (
    <Card>
      <CardHeader title={<Typography variant="h5" mb={1} >Basic Information</Typography>} />
      <CardContent>
        <Grid container spacing={4} >
          <Grid item sm={10}>
            <Grid container spacing={2}>
              {Object.entries(basicUserData).map((item, index) => {
                if (index < 5)
                  return (<Grid item direction="row" md={4} sm={6} xs={12}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='h6' sx={{ fontWeight: 500 }}>{item[0]}:</Typography>
                      <Typography variant='h6' >{item[1]}</Typography>
                    </Stack>
                  </Grid>)
                else if (index === 5)
                  return (<Grid item direction="row" md={12} sm={6} xs={12}>
                    <Stack direction="row" spacing={1}>
                      <Typography variant='h6' sx={{ fontWeight: 500 }}>{item[0]}:  </Typography>
                      <Typography variant='h6' >{item[1]}</Typography>
                    </Stack>
                  </Grid>)
              })}
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Paper sx={{ backgroundColor: "gray", height: "100px", width: "100px", marginTop: "-20px" }}>
              <img src={userData?.photo} height="100px" width="100px" alt="Profile Pic" />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BasicInfoCard