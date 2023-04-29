import React, { useEffect, useState } from 'react'
import PageContainer from 'src/components/container/PageContainer'
import { Box, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material"
import TimelineCard from 'src/components/shared/TimelineCard'
import { axiosInstance } from 'src/config/axiosInterceptors'
import { useNavigate } from 'react-router'
import moment from 'moment'

const Checkups = () => {
  const [open, setOpen] = useState(false)
  const [i, setI] = useState()
  const navigate = useNavigate()
  const handleClose = () => {
    setOpen(false);
  };
  const [checkupData, setCheckupData] = useState()
  useEffect(() => {
    axiosInstance.get("http://localhost/checkups/")
      .then((res) => {
        console.log(res)
        setCheckupData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleCardClick = (i) => {
    console.log("working", i)
    setOpen(true)
    setI(i)
  }

  return (
    <PageContainer>
      <Box display="flex" flexDirection="column" gap={2}>
        {checkupData?.map((item, index) => {
          return (<Box onClick={() => handleCardClick(index)}><TimelineCard key={index} hospName={item.name} date={moment(item.created_on).format('MMMM Do YYYY, h a')} treatment={item.deduction} /></Box>)
        })}
      </Box>
      { open ? <Dialog
        open={open}
        onClose={handleClose}
        width="80%"
      >
        <DialogTitle>Details of {checkupData[i].name}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" alignItems="center"my={2}>
            <Typography variant="h6" fontWeight="bolder" width="30%">Reason of Visit</Typography>
            <Typography variant="h6"  width="70%">{checkupData[i].reason_to_visit}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <Typography variant="h6" fontWeight="bolder" width="30%">Deduction</Typography>
            <Typography variant="h6"  width="70%">{checkupData[i].deduction}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <Typography variant="h6" fontWeight="bolder" width="30%">Next Checkup</Typography>
            <Typography variant="h6"  width="70%">{checkupData[i].next_checkup ? moment(checkupData[i].next_checkup).format('MMMM Do YYYY, h a') : "No next Checkup"}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <Typography variant="h6" fontWeight="bolder" width="30%">Created By</Typography>
            <Typography variant="h6"  width="70%">{checkupData[i].created_by ? checkupData[i].created_by : "-"}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
            <Typography variant="h6" fontWeight="bolder" width="30%">Created On</Typography>
            <Typography variant="h6"  width="70%">{moment(checkupData[i].created_on).format('MMMM Do YYYY, h a')}</Typography>
          </Box>
        </DialogContent>
      </Dialog> : null}
    </PageContainer>
  )
}

export default Checkups