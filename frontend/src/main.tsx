import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import bob from './assets/saturatedbob.png'

import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Upload from './components/Upload.tsx'
import Todos from './components/Todos.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Upload />,
    errorElement: (
      <Link to='/'>
        <img src={bob} className='w-full h-full'></img>
      </Link>
    )
  },
  {
    path: '/testapi',
    element: <Todos />
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
