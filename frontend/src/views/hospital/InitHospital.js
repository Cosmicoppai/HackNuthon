import React, { useState } from 'react'
import { Box, Button, Typography, Dialog, DialogContent } from "@mui/material"
import Logo from "../../assets/images/logos/ayur_logo_big.png"
import "@fontsource/tiro-devanagari-hindi";
import QrReader from "react-web-qr-reader"
import { useNavigate } from 'react-router';
import { axiosInstance } from 'src/config/axiosInterceptors';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const InitHospital = () => {
  const delay = 500;
  const navigate = useNavigate()

  const previewStyle = {
    height: "100%",
    width: "100%"
  };

  const [open, setOpen] = useState(false)
  const [result, setResult] = useState("No result");

  const closePopUp = () => {
    setOpen(false)
  }
  const handleScan = async (rr) => {
    if (rr) {
      console.log(rr)
      let id = rr?.data?.split("/").reverse()[0]

      if (id) {
        localStorage.setItem("userId", id)
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
  console.log(result)

  console.log(result)

  const handleError = (error) => {
    console.log(error);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "78vh" }}>
      <Box>
        <img src={Logo} alt="Logo" height={400} />
      </Box>
      <Typography variant="h2" sx={{ fontFamily: "Tiro Devanagari Hindi", fontStyle: "italic", marginTop: "-5rem", marginBottom: "2rem" }}>आयुर आपके आयुर के लिए</Typography>

      {/* <Button variant="contained" sx={{ backgroundColor: 'success.main', ":hover": { backgroundColor: 'success.dark' } }} onClick={() => setOpen(true)}>Scan to Proceed</Button> */}
      <Dialog
        open={open}
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
    </Box>
  )
}

export default InitHospital