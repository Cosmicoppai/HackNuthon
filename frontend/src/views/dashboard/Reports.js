import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ScanCard from 'src/components/shared/ScanCard';
import { axiosInstance } from 'src/config/axiosInterceptors';

const testData = [{
  type: "Blood Test",
  date: "12th May 2020",
  desc: "A blood test is a lab analysis of things that may be found in your blood. You may have blood tests to keep track of how well you are managing a condition such as diabetes or high cholesterol. You may also have them for routine checkups or when you are ill.",
  images: ["https://qph.cf2.quoracdn.net/main-qimg-457d44b4045549293451bc2ae5e011b5"]
},
{
  type: "Urine Test",
  date: "16th December 2013",
  desc: "A urinalysis is a test of your urine. It's used to detect and manage a wide range of disorders, such as urinary tract infections, kidney disease and diabetes. A urinalysis involves checking the appearance, concentration and content of urine.",
  images: []
},
{
  type: "Biopsy",
  date: "13th Ocober 2009",
  desc: "issue samples are removed and examined, usually with a microscope. The examination often focuses on finding abnormal cells that may provide evidence of inflammation or of a disorder, such as cancer. Tissues that are commonly examined include skin, breast, lung, liver, kidney, and bone.",
  images: ["https://liferaftgroup.org/wp-content/uploads/2018/05/mock-pathology-report-full-600x776.jpg"]
},]

const Reports = () => {
  const [userReports, setUserReports] = useState()
  
  const ayurId = localStorage.getItem('ayurId')  

  useEffect(() => {
  axiosInstance.get(`/${ayurId}/reports`)
    .then((res) => {
      console.log(res)
      setUserReports()
    }).catch((err) => console.log(err))
  }, [])
  return (
    <PageContainer title="Dashboard" description="Ayur Dashboard">
      <Box>
        <Typography variant="h4" mb={4}>Tests</Typography>
        {testData.map((item, index) => {
          return (<ScanCard key={index} typeHead="Test" type={item.type} date={item.date} desc={item.desc} images={item.images} />)
        })}
      </Box>
    </PageContainer>
  )
}

export default Reports