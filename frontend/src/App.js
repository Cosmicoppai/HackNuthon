import { CssBaseline, ThemeProvider } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { ToastContainer } from "react-toastify"
import { axiosInstance } from './config/axiosInterceptors';

import { baselightTheme } from "./theme/DefaultColors";
import { useEffect } from 'react';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const navigate = useNavigate()
  const checkValid = () => {
    //Make Request to hospital
    axiosInstance.post('/check_token')
      .then((response) => {
        console.log(response)

        navigate("/")

      })
      .catch((err) => {
        navigate("/auth/login")

        console.log(err)
      })
  }



  useEffect(() => {
    const token = localStorage.getItem('access_token')
    console.log(token)

    // if (!token) navigate("/auth/login")
    // checkValid()
    //Check for valid token

  }, [])

  return (
    <ThemeProvider theme={theme}>
     
        <CssBaseline />
        {routing}
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
