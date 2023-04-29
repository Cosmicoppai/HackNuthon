import React from 'react'
import { Card, CardContent, CardHeader, Typography, Stack } from "@mui/material"

const TimelineCard = ({ hospName, date, treatment }) => {
  return (
    <Card sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
      <CardHeader title={
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant='h5'>{hospName}</Typography>
        <Typography variant='body1'>{date}</Typography>
      </Stack>
      }/>
      <CardContent >
        <Typography variant="body1">{treatment}</Typography>
      </CardContent>
    </Card >
  )
}

export default TimelineCard