import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// axios.interceptors.response.use(
//   response => {
//     return response
//   },

//   function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 401 &&
//       originalRequest.url === 'http://127.0.0.1:3000/auth/token') {
//       router.push('/login')
//       return Promise.reject(error)
//     }
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const refreshToken = localStorageService.getRefreshToken()
//       return axios
//         .post('/auth/token', {
//           refresh_token: refreshToken
//         })
//         .then(res => {
//           if (res.status === 201) {
//             localStorageService.setToken(res.data)
//             axios.defaults.headers.common['Authorization'] =
//               'Bearer ' + localStorageService.getAccessToken()
//             return axios(originalRequest)
//           }
//         })
//     }
//     return Promise.reject(error)
//   }
// )
