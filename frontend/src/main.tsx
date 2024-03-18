import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Upload from './components/Upload.tsx'
import Todos from './components/Todos.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Upload/>,
  },
  {
    path: '/testapi',
    element: <Todos/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
