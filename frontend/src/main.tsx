import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import bob from './assets/saturatedbob.png'

import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Upload from './components/Upload.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import Home from './components/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: (
      <Link to='/'>
        <img src={bob} className='w-full h-full'></img>
      </Link>
    )
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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
