import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardMedia, Box, Dialog, DialogContent, Typography } from "@mui/material"

const ScanCard = ({ typeHead, type, date, desc, images }) => {
  const [open, setOpen] = useState(false)
  const [imgtoShow, setImgtoShow] = useState('')

  const handleImageClick = (img) => {
    setImgtoShow(img)
    setOpen(true)
  }

  const closePopUp = () => {
    setOpen(false)
  }

  console.log(imgtoShow)

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', marginBottom: "2rem" }}>
      <CardHeader direction="row" title={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: "1rem" }}>
          <Typography variant='h5' fontWeight={600}>{typeHead} Type</Typography>
          <Typography variant='h6'>{type}</Typography>
        </Box>
        <Typography variant='h6' justifySelf='flex-end'>{date}</Typography>
      </Box>}>
      </CardHeader>

      <CardContent><Box><Typography variant="h6">{desc}</Typography></Box></CardContent>

      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }} spacing={2}>
          {images?.map((item, index) => {
            return (
              <CardMedia key={index} component="img" sx={{ width: "200px", height: "140px", borderRadius: "0.6rem" }} image={item} alt='Reports or scans' onClick={() => handleImageClick(item)} />
            )
          })}
        </Box>
      </CardContent>

      <Dialog
        open={open}
        onClose={closePopUp}
        PaperProps={{ sx: { height: "90vh", width: "75vw" } }}
      >
        <DialogContent sx={{display: "flex", justifyContent: "center", alignItems: "center"}}><img src={imgtoShow} alt="No Image" height="100%" width="100%"/></DialogContent>
      </Dialog>
    </Card>
  )
}

export default ScanCard