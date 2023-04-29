import React, { useState } from 'react'
import { Box, CardHeader, Stack, Typography, Card, CardContent, CardMedia,  Dialog, DialogContent } from "@mui/material"
import { useLocation } from 'react-router'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

const Hospital = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [isScanOpen, setIsScanOpen] = useState(false)
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [imgtoShow, setImgtoShow] = useState('')

  const handleImageClick = (img) => {
    setImgtoShow(img)
    setOpen(true)
  }

  const closePopUp = () => {
    setOpen(false)
  }

  return (
    <Box>
      <Card sx={{ marginBottom: "2rem" }}>
        <CardHeader title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <Stack>
                <LocalHospitalIcon fontSize='large' />
              </Stack>
              <Stack>
                <Typography variant='h4'>{location.state?.hospName}</Typography>
                <Typography variant='h6'>{location.state?.add}</Typography>
              </Stack>
            </Box>
            <Box>
              <Typography variant='subtitle1'>{location.state?.date}</Typography>
            </Box>
          </Box>
        } />
      </Card>
      <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
        <Typography variant='h6' fontWeight={800}>Treatment:</Typography>
        <Typography variant='h6'>{location.state?.treatment}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
        <Typography variant='h6' fontWeight={800}>Diagnosis:</Typography>
        <Typography variant='h6'>{location.state?.diagnosis}</Typography>
      </Box>

      {/* Scans and Reports  */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='h6' fontWeight={800}>Scans</Typography>
          <Box onClick={() => setIsScanOpen(!isScanOpen)} sx={{ display: "grid", placeItems: "center" }}>{isScanOpen ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}</Box>
        </Box>
        {isScanOpen ? <Box>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }} spacing={2}>
                {location.state.images?.map((item, index) => {
                  return (
                    <CardMedia key={index} component="img" sx={{ width: "200px", height: "140px", borderRadius: "0.6rem" }} image={item} alt='Reports or scans' onClick={() => handleImageClick(item)} />
                  )
                })}
              </Box>
            </CardContent>
          </Card>
        </Box> : null}
      </Box>

      {/* Tests  */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='h6' fontWeight={800}>Reports</Typography>
          <Box onClick={() => setIsTestOpen(!isTestOpen)} sx={{ display: "grid", placeItems: "center" }}>{isTestOpen ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}</Box>
        </Box>
        {isTestOpen ? <Box>
          <Card>
            <CardContent onClick={() => handleImageClick}>
              {location.state?.tests?.map((item, index) => {
                return (
                  <img key={index} src={item} height="140px" width="200px" alt="" />
                )
              })}
            </CardContent>
          </Card>
        </Box> : null}
      </Box>
      <Dialog
        open={open}
        onClose={closePopUp}
        PaperProps={{ sx: { height: "90vh", width: "75vw" } }}
      >
        <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}><img src={imgtoShow} alt="reports" height="100%" width="100%" /></DialogContent>
      </Dialog>
    </Box>
  )
}

export default Hospital