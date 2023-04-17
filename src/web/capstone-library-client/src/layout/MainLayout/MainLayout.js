import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function MainLayout() {
  const navigate = useNavigate();
  const backClick = () => {
    navigate(-1);
  }
  return (
    <>
      <Header />
        <div className='back-button' onClick={() => backClick()}>
          <FontAwesomeIcon icon={faCircleArrowLeft} size='2xl' color='#FD8A8A' />
        </div>
        <Outlet />
      <Footer />
    </>
  )
}
