import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Root from './Root'

const HomePage = lazy(async () => await import('../pages/Home'))
const Dashboard = lazy(async () => await import('../components/Dashboard'))

export const BrowserRouters = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/home',
        element: <Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>
      },
      {
        path: '/dashboard',
        element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>
      },
    ]
  }
])
