import React from 'react'
import { Box } from '@mui/material';
import MedicalRecord from './MedicalRecord';
import Scans from './Scans';

const EmerView = ({handleEmerState}) => {
  return (
    <Box sx={{ display: "flex"}}>
      <Box sx={{padding: '1.5rem 0 0 2rem', borderRight: "1px solid black", width: "50%", overflowY: "scroll", height: "90vh", }}>
        <MedicalRecord closeEmerDialog={handleEmerState}/>
      </Box>
      <Box sx={{padding: '1.5rem 0 0 2rem' , width: "50%",overflowY: "scroll", height: "90vh"}}>
        <Scans />
      </Box>
    </Box>
  )
}

export default EmerView