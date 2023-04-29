import React, { useEffect, useState } from 'react';
import Menuitems from './MenuItems';
import MenuItemsBeforeScan from './MenuItemsBeforeScan';
import { useLocation, useNavigate } from 'react-router';
import { Box, Button, List, DialogContent, Dialog, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import EmerView from 'src/views/dashboard/EmerView';
import { FaAmbulance } from 'react-icons/fa'
import AddIcon from '@mui/icons-material/Add';
import QrReader from "react-web-qr-reader"

const SidebarItems = () => {
  const [result, setResult] = useState("No result");

  const delay = 500;

  const previewStyle = {
    height: "100%",
    width: "100%"
  };
  const { pathname } = useLocation();
  const pathDirect = pathname;

  const navigate = useNavigate()

  const [isEmerOpen, setIsEmerOpen] = useState(false)

  const handleEmerClick = () => {
    setIsEmerOpen(true)
    localStorage.setItem('emerState', JSON.stringify(isEmerOpen))
  }

  const handleEmerClose = () => {
    setIsEmerOpen(false)
  }

  const addRecord = () => {
    navigate('/user/addRecord')
  }

  useEffect(() => {
    localStorage.setItem('emerState', JSON.stringify(isEmerOpen))
  }, [isEmerOpen])


  const [userId, setUserId] = useState(null)

  const location = useLocation()
  useEffect(() => {
    let userIdLS = localStorage.getItem('userId')
    let ayurIdLs = localStorage.getItem('ayurId')
    if (userIdLS) {
      setUserId(userIdLS)
    } else {
      if(ayurIdLs){
        setUserId(ayurIdLs)

      }else{
        setUserId(null)

      }
    }

  }, [location?.pathname])


  const [open, setOpen] = useState(false)

  const handleScan = async (rr) => {
    if (rr) {
      console.log(rr)
      let id = rr?.data?.split("/").reverse()[0]

      if (id) {
        localStorage.setItem("userId", id)
        localStorage.setItem('ayurId', 3453534534534534)
        navigate("/user/profile", { state: { ayurId: 3453534534534534 } })

        // await axiosInstance.get(`/${id}`)
        //   .then((response) => {
        //     console.log(response.data?.ayur_id)
        //     localStorage.setItem('ayurId', response.data?.ayur_id)
        //     navigate("/user/profile", { state: { ayurId: response.data?.ayur_id } })
        //   })
        //   .catch((err) => {
        //     toast.error("Invalid User")
        //     console.log(err)
        //   })

      }
    }

  };
  console.log(result)

  console.log(result)

  const handleError = (error) => {
    console.log(error);
  };

  const closePopUp = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ px: 3, display: 'flex', flexDirection: 'column', height: '80vh', justifyContent: 'space-between' }}>
      <List sx={{ pt: 0 }} className="sidebarNav">

        {userId ? Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        }) : MenuItemsBeforeScan.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })
        }
      </List>
      {userId ? <Box sx={{ display: "flex", justifySelf: "flex-end", flexDirection: "column" }}>
        <Button variant='contained' onClick={() => addRecord()} sx={{
          backgroundColor: "success.main",
          margin: "8px 0",
          width: "100%",
          ':hover': {
            backgroundColor: "success.dark"
          }
        }}><Box sx={{ display: "flex", alignItems: "center", gap: '0.5rem' }}>
            <AddIcon />
            <Typography>Add Record</Typography>
          </Box>
        </Button>
        <Button variant='contained' onClick={() => handleEmerClick()} sx={{
          backgroundColor: "error.main",
          margin: "8px 0",
          width: "100%",
          ':hover': {
            backgroundColor: "error.dark"
          }
        }}><Box sx={{ display: "flex", alignItems: "center", gap: '1rem' }}>
            <FaAmbulance />
            <Typography >Emergency View</Typography>
          </Box>
        </Button>
      </Box> : null}

      <Dialog
        open={isEmerOpen}
        onClose={handleEmerClose}
        fullScreen
        PaperProps={{ sx: { overflowY: 'hidden' } }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: 'error.main' }}>
          <Toolbar sx={{}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleEmerClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              Emergency View
            </Typography>
          </Toolbar>
        </AppBar>
        <EmerView handleEmerState={handleEmerClose} />
      </Dialog>
      {/* <Dialog
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
      </Dialog> */}
    </Box>
  );
};
export default SidebarItems;
