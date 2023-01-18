import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        navigate('/');
    }

  return (
    <div>
        <header className='shadow-xl border-b border-gray-400/10'>
        <nav className='text-white p-4 flex items-center justify-between max-w-6xl mx-auto'>
          <Link to={'/'} className='text-2xl font-bold tracking-wider'>JOB-API</Link>
          
          {localStorage.getItem('token') ? (
            <ul className='flex items-center'>
              <li className=''>Hello, {localStorage.getItem('name')}</li>          
              <li><Link to={'/dashboard'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg px-5 py-2 ml-4 inline-block focus:outline-none">My Jobs</Link></li>
              <li><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm rounded-lg px-5 py-2 ml-4 focus:outline-none" onClick={logout}>Log Out</button></li>
            </ul>
          ) : (
            <ul className='flex items-center'>
              <li><Link to={'/login'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ml-5 focus:outline-none">Login</Link></li>            
              <li><Link to={'/register'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 ml-5 focus:outline-none">Register</Link></li>            
            </ul>

          )}
          


        </nav>
      </header>
    </div>
  )
}

export default Navbar