import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({login, error}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = (event) => {
    event.preventDefault();
    login(email, password);  
    
  }
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  useEffect(() => {
    if(token){
      navigate('/dashboard');
    }
  },[]);
  

  return (
    <div className="h-[80vh] grid place-items-center">
      <form className="w-[200px]" onSubmit={handleLogin}>
        <h1 className="text-2xl text-white text-center font-semibold mb-5">Login</h1>
        <p className={`${error ? "block" : "hidden"} text-red-500 mb-5 text-center bg-red-600/20 rounded-xl text-sm py-1`}>{error}</p>
        <div className="mb-6">          
          <input
            type="email"
            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Log In
          </button>
      </form>
    </div>
  )
}

export default Login