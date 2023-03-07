import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import DetailBook from './views/DetailBook/DetailBook'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MyBook from './views/MyBook/MyBook'
import Profile from './views/Profile/Profile'
import Register from './views/Register/Register'
import UploadBook from './views/WritePost/UploadBook'
import WritePost from './views/WritePost/WritePost'

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
                path: '/register',
                element: <Register />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/detail-book/:id',
                element: <DetailBook />
            },
            {
                path: '/upload-book',
                element: <UploadBook />
            },
            {
                path: '/write-post',
                element: <WritePost />
            }
            ,
            {
                path: '/my-book',
                element: <MyBook />
            }
        ]
    }
  ])
}
