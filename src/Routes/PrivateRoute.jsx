import React from 'react'
import { Outlet } from 'react-router'
import { checkIsAuthorized } from '../utils/isAuth'
import Redirect from './Redirect'
export default function PrivateRoute() {
  return (
    <>
    {
        checkIsAuthorized()? <Outlet/>:<Redirect/>
    }
    </>
  )
}
