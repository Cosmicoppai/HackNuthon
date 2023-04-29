import React, { useState } from 'react'
import { Box, Button, List, DialogContent, Dialog, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import QrReader from "react-web-qr-reader"
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'src/config/axiosInterceptors';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ScanPage = () => {
  const [result, setResult] = useState("No result");
  const navigate = useNavigate()
  const delay = 500;

  const previewStyle = {
    height: "100%",
    width: "100%"
  };

  
  const [open, setOpen] = useState(false)

  const handleScan = async (rr) => {
    if (rr) {
      console.log(rr)
      let id = rr?.data?.split("/").reverse()[0]

      if (id) {
        // localStorage.setItem("userId", id)
        // localStorage.setItem('ayurId', 3453534534534534)
        // navigate("/user/profile", { state: { ayurId: 3453534534534534 } })

        await axiosInstance.get(`/${id}`)
          .then((response) => {
            console.log(response.data?.ayur_id)
            localStorage.setItem('ayurId', response.data?.ayur_id)
            navigate("/user/profile", { state: { ayurId: response.data?.ayur_id } })
          })
          .catch((err) => {
            toast.error("Invalid User")
            console.log(err)
          })

      }
    }

  };


  const handleError = (error) => {
    console.log(error);
  };

  const closePopUp = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={true}
      onClose={closePopUp}
      PaperProps={{ sx: { height: "90vh", width: "75vw" } }}
    >
      <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ScanPage