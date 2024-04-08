import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import bob from './assets/saturatedbob.png'

import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Upload from './components/Upload.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import Home from './components/Home.tsx'
import Layout from './components/Layout.tsx'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/upload',
        element: <Upload/>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ],
    errorElement: (
      <Link to='/'>
        <img src={bob} className='w-full h-full'></img>
      </Link>
    )
  }
  
  // Faire profile: historiques des uploads, tri par fini / en cours / non traité
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
