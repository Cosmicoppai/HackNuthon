import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ScanCard from 'src/components/shared/ScanCard';
import { axiosInstance } from '../../config/axiosInterceptors';

const scanData = [{
  type: "Brain Scan",
  date: "5th April 2019",
  desc: "These MRI scan sshow that Mr. Yash has Stage 1 Tumor in the right side of the brain. ",
  images: ["https://media.istockphoto.com/id/1292254104/photo/magnetic-resonance-imaging-mri-photosensitive-epilepsy-seizures-neurological-diseases.jpg?s=612x612&w=0&k=20&c=ODrUc4TJLgh1U9C-i1Q72y3bLEKyRNnflAIU1qWMnDU=",
  ]
},
{
  type: "CT Scan",
  date: "23th February 2003",
  desc: "This person is suffering from a COVID 19 infection. Th CT Scans show that the left nostril is blocked and the person is having difficulties in breathing.",
  images: ["https://media.istockphoto.com/id/174688242/photo/cranial-tomography-image-of-child-patient.jpg?s=612x612&w=0&k=20&c=KyR5ywnZGAmcVr2O3kgz6DBOj5QQVj55dTsMjdGs_ro="]
},
{
  type: "X-Ray",
  date: "5th Feb 2023",
  desc: "Chest x-Rays show that this person is suffering from some disease.",
  images: ["https://media.istockphoto.com/id/177559095/photo/hand-x-ray-view.jpg?s=612x612&w=0&k=20&c=6G9EB0k_0T4vvMollybG1yPOjPNSIEcIBL2EUT-C_HI=",
    "https://media.istockphoto.com/id/913954832/photo/x-ray-of-thorax.jpg?s=612x612&w=0&k=20&c=t0GlrBvVrFdBN23ROqKr3WpHs-0BZJCz3lBZEAMGCE8=",]
},]

const Scans = () => {
  const [userScans, setUserScans] = useState()

  useEffect( () => {
    const ayurId = localStorage.getItem('ayurId')
    const at = localStorage.getItem('access_token')
    console.log(at)
    if(!ayurId)
    return null

    axiosInstance.get(`/${ayurId}/scans`)
    .then((res) => {
      console.log(res)
      // setUserScans()
    }).catch((err) => console.log(err))
  }, [])

  return (
    <PageContainer title="Dashboard" description="Ayur Dashboard">
      <Box>
        <Typography variant="h4" mb={4}> Scans and Reports</Typography>
        {scanData.map((item, index) => {
          return (<ScanCard key={index} typeHead="Scan" type={item.type} date={item.date} desc={item.desc} images={item.images} />)
        })}
      </Box>
    </PageContainer>
  )
}

export default Scans