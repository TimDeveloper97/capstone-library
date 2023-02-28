import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'

export default function Route() {
  return useRoutes([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
  ])
}
