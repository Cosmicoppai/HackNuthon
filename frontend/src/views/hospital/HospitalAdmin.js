import React from 'react'
import PageContainer from 'src/components/container/PageContainer';
import InitHospital from './InitHospital';


const HospitalAdmin = () => {
  return (
    <PageContainer title="Hospital Admin View" description="Welcome, Admin">
      <InitHospital/>
    </PageContainer>  
  )
}

export default HospitalAdmin