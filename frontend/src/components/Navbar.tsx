import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <Link to="/" className='m-2 bg-slate-200 px-2 rounded hover:bg-slate-300'>Menu</Link>
    </div>
  )
}
