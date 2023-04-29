import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const BasicProfile = Loadable(lazy(() => import('../views/dashboard/BasicProfile')))
const Scans = Loadable(lazy(() => import('../views/dashboard/Scans')))
const Reports = Loadable(lazy(() => import('../views/dashboard/Reports')))
const MedicalRecord = Loadable(lazy(() => import('../views/dashboard/MedicalRecord')))
const EmerView = Loadable(lazy(() => import('../views/dashboard/EmerView')))
const Hospital = Loadable(lazy(() => import('../views/hospital/Hospital')))
const AddRecord = Loadable(lazy(() => import('../views/hospital/AddRecord')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const InitHospital = Loadable(lazy(() => import('../views/hospital/InitHospital')))
const NormalView = Loadable(lazy(() => import('../views/NormalView')))
const HospitalRegister = Loadable(lazy(() => import('../views/hospital/HospitalRegister')))
const HospitalAdmin = Loadable(lazy(() => import('../views/hospital/HospitalAdmin')))
const AddStaff = Loadable(lazy(() => import('../views/hospital/AddStaff')))
const AddDoctor = Loadable(lazy(() => import('../views/hospital/AddDoctor')))
const ScanPage = Loadable(lazy(() => import('../views/hospital/ScanPage')))
const Checkups = Loadable(lazy(() => import('../views/hospital/Checkups')))

const Router = [
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      // { path: '/', element: <Navigate to="/profile" /> },
      { path: '404', element: <Error /> },
      // { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element:  <InitHospital />,
  },
  {
    path: '/user',
    element: <FullLayout />,
    children: [
      { path: '/user/profile', exact: true, element: <BasicProfile /> },
      { path: '/user/scans', exact: true, element: <Scans /> },
      { path: '/user/reports', exact: true, element: <Reports /> },
      { path: '/user/records', exact: true, element: <MedicalRecord /> },
      { path: '/user/emergency', exact: true, element: <EmerView /> },
      { path: '/user/hospital', exact: true, element: <Hospital /> },
      { path: '/user/addrecord', exact: true, element: <AddRecord /> },
    ],
  },
  {
    path: '/:ayurId',
    element: <NormalView />
  },
  {
    path: '/hospital',
    element: <FullLayout />,
    children: [
      // { path: '/hospital/register', exact: true, element: <BasicProfile /> },
      { path: '/hospital/admin', exact: true, element: <HospitalAdmin /> },
      { path: '/hospital/addStaff', exact: true, element: <AddStaff /> },
      { path: '/hospital/addDoc', exact: true, element: <AddDoctor /> },
      { path: '/hospital/checkups', exact: true, element: <Checkups /> },
      { path: '/hospital/scan', exact: true, element: <ScanPage /> },
    ],
  },
  {
    path: '/register',
    element: <HospitalRegister />
  }
];

export default Router;
