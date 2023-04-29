import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from '@mui/lab';
import TimelineCard from 'src/components/shared/TimelineCard';
import { useNavigate } from 'react-router';
import {axiosInstance} from "../../config/axiosInterceptors"

const pastRecords = [{
  hospName: "Abcd Hospital, Ambi Pune",
  date: "23rd March 2023",
  treatment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  add: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  diagnosis: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur asperiores obcaecati iusto incidunt architecto, numquam deserunt!", 
  images: ["https://storage.googleapis.com/kagglesdsdata/datasets/672377/1183165/Testing/glioma_tumor/image%281%29.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230322%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230322T195904Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=6fad91b0e33ea01fdb30f6483c07c8930dc3ec18baf4e23061ad8c5da7100634a4625a2bdc38d83e87b353fb4826321e1b440fb8e058db345f9b51107c84276b567929240be9093ac452b320284b80b3675c2884c85a112e5cf37c38c1c37807a4caecc8b615015f1c30099113b054c54fc36eafc1922073cbe1563bf1737b95a3b43d7bc1edf8a09a5c9d2ca1adf4b40f0528cd64a065dc21a3bd3bdd12bc88b2eb96d9dd3ada2a8a11c75542c644cc1c3cd8b8f0d52c600e394c94c7784870d361e9f5f20e5caa832daa1c86a1d451eba913e51b2d2ac264bf87c12d80088446c51f353cf134d1edad1dcc4a9bb10f39173d31f450c3d644d4bd7a86919416",
  "https://storage.googleapis.com/kagglesdsdata/datasets/672377/1183165/Testing/glioma_tumor/image%2810%29.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230322%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230322T195904Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=6be42bc477e6d8429d9aa4c80a245f1a403db9567eadfd62e51e81732bb7243cf3c795395d72176319754d0f3986bb13cbfc7de31713cfad0fb1b7de30193e9521fb5545e974d0f387bb18a6bb839098d606a8232488448136edc314583df41e56fac7568905b494bf48e5f2f50e8453346182c86248b5208c9d2f523743c9f134e4cc20d18a378f0e0153823d9b1092c2542277e481b7cb879310729c332637a4c383afebc1e6ffb0bdb6fe22e35181022862dcf900d9bd0e50547550424220f304eb85a773ec50f6e4a2da34552583dfff43752eaacaf46b802a5994bfb591fdf14d856f0d8b879c660f9681d8635f26fe648bb5c4cd1f9ccfcefd0537e815",
  "https://storage.googleapis.com/kagglesdsdata/datasets/672377/1183165/Testing/glioma_tumor/image%2813%29.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20230322%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230322T195904Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=60364f84dea7e224e7b34b63ff96d60a675f52b005f72d3372ec472ebc416d2830e12ade5f40ae23fd8df396a8559273220c66b912b56aad5734b7a3c599b7c3bee09482ee9a5288169f93cb9c5f7e51814adf7c49fcffe9f90204ec402469af5516832a54e70874f561c63265913feb95afc204c7d3c54dcdb841cda772aecdb9d02de5bad840af2c6830fa63fa5d8cd568d6588745a7abf07076fe46805068b000bd7597d6869a1e08f7d5c9887313d2210e211489c4e5b4d913479f9ab1dfbf6209187c314fe02623b369c082c23a9bcccc3fab347aab32542505999672a26b0c47eb3451b91f3145fd28901650c703f6fbea7c8d6cff0a403f30ce006744", ],
  tests: ["https://qph.cf2.quoracdn.net/main-qimg-457d44b4045549293451bc2ae5e011b5"]
},
{
  hospName: "XYZ Hospital, Ambi Pune",
  date: "23rd March 2023",
  treatment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, perspiciatis"
}, {
  hospName: "Maitri Hospital, Ambi Pune",
  date: "23rd September 2023",
  treatment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed ullam iste, in autem dolore animi earum cupiditate numquam iusto molestiae.",
  add: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  diagnosis: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur asperiores obcaecati iusto incidunt architecto, numquam deserunt!"
}, {
  hospName: "Surya Hospital, Ambi Pune",
  date: "23rd June 2023",
  treatment: "Lorem ipsum dolor sit amet consectetur adipisicing."
}, {
  hospName: "Kanak's Hospital, Ambi Pune",
  date: "23rd December 2023",
  treatment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, perspiciatis",
  add: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  diagnosis: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur asperiores obcaecati iusto incidunt architecto, numquam deserunt!"
},
{
  hospName: "Tata Hospital, Ambi Pune",
  date: "23rd March 2023",
  treatment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed ullam iste, in autem dolore animi earum cupiditate numquam iusto molestiae."
}, {
  hospName: "This Hospital, Ambi Pune",
  date: "23rd September 2023",
  treatment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, perspiciatis",
  add: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  diagnosis: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur asperiores obcaecati iusto incidunt architecto, numquam deserunt!"
}, {
  hospName: "That Hospital",
  date: "23rd June 2023",
  treatment: "Lorem ipsum dolor sit amet consectetur adipisicing."
}, {
  hospName: "Yoh Hospital, Ambi Pune",
  date: "23rd December 2023",
  treatment: "Lung Cancer Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sequi delectus veritatis nemo unde quod perspiciatis tempore, inventore illum ex."
},]

const MedicalRecord = ({closeEmerDialog}) => {
  const navigate = useNavigate()
  const [checkups, setCheckups] = useState()

  const handleRecordClick = (d) => {
    navigate('/user/hospital', { state: d })
    const emerState = JSON.parse(localStorage.getItem('emerState'))
    
    if (emerState)
      closeEmerDialog()
  }

  useEffect(() => {
    const ayurId = localStorage.getItem('ayurId')
    const d = axiosInstance.get(`/${ayurId}/checkups`)
    .then((res) => {
      console.log(res)
      setCheckups()
    })
    .catch((err) => {
      console.log(err)})
  }, [])

  return (
    <PageContainer title="Dashboard" description="Ayur Dashboard">
      <Box>
        <Typography variant="h4" mb={4}>Past Medical Records</Typography>
        <Timeline position='alternate'>
          {pastRecords.map((item, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineConnector sx={{ backgroundColor: 'primary.main' }} />
                  <TimelineDot sx={{ backgroundColor: 'warning.main' }} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent onClick={() => handleRecordClick(item)} sx={{
                  ":hover": {
                    transform: 'scale(1.05)',
                    cursor: "pointer"
                  }
                }}>
                  <TimelineCard hospName={item?.hospName} date={item.date} treatment={item.treatment} />
                </TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
      </Box>
    </PageContainer>
  )
}

export default MedicalRecord