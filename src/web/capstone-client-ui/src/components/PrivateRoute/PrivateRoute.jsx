import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({children}) {

    const token = window.localStorage.getItem("token");
    console.log(token);
    if(token){
        return <Navigate to={'/login'} replace />
    }
  return <Outlet />;
}
