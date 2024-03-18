import React from 'react'
import Login from '../Pages/Login';
import { Routes, Route } from "react-router"; 
import Dashboarda from '../Components/Dashboarda';
import PrivateRoute from './PrivateRoute';

function PageRoutes() {
  return (
    <>
    <Routes>
        <Route  path="/login" element={<Login />}/>
        <Route element={<PrivateRoute/>}>
        {/* <Route  path="/" element={<Dashboarda />}/> */}
        <Route path='/*' element={<Dashboarda/>}/>
        {/* <Route path='#' element={<h1>404 Page not Found</h1>}/> */}

        </Route>
    </Routes>
    </>
  )
}
export default PageRoutes