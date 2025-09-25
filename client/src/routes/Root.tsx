import { lazy, Suspense } from 'react'

import { useAuth } from '../auth/AuthContext'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import type { JSX } from "react/jsx-runtime";
import { toast } from 'react-toastify';

const LoginPage = lazy(async () => await import('../pages/login'))


function Root(): JSX.Element {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Suspense fallback={
        toast.info('Loading...', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })}>
        <LoginPage />
      </Suspense>
    )
  }


  return (
    <section >
      <NavBar />
      <main className='w-full'>
        <Outlet />
      </main>
    </section>
  )
}

export default Root
