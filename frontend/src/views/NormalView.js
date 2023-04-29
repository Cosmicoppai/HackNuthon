import React, { useEffect } from 'react'
import BasicProfile from '../views/dashboard/BasicProfile'
import { Box, Typography } from "@mui/material"
import axios from "axios"
import router from "src/routes/Router";

const NormalView = () => {
  useEffect(() => {
    axios.get(`/${router.query?.ayurId}`)
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }, [router.query?.ayurId])
  return (
    <Box sx={{ padding: "4rem" }}>
      <Typography variant="h4">Normal View</Typography>
      <BasicProfile />
    </Box>
  )
}

export default NormalView