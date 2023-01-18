import { Route, Routes } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Register from './routes/Register'
import Login from './routes/Login'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import CreateJob from './routes/CreateJob'
import EditJob from './routes/EditJob'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import Home from './routes/Home'

const App = () => {

  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('')

  const login = async (email, password) => {    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email: email,
        password: password
      });
      localStorage.setItem('name', response.data.user);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setName(response.data.user);
      navigate('/dashboard')
      // console.log(response.data);
    } catch (error) {
      // console.log(error);
      setError(error.response.data)
    }
  }

  const register = async (name, email, password) => { 
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
        name: name,
        email: email,
        password: password
      });
      // console.log(response.data)

      localStorage.setItem('name', response.data.name);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setName(response.data.name);
      navigate('/dashboard')

    } catch (error) {
      console.log(error);
      if(error.response.data.code === 11000){        
        setError("User Already Exists")
      }
    }
  }

  return (
    <div className="App">


      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register register={register} error={error}/>}/>
        <Route path='/login' element={<Login login={login} error={error}/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/createjob' element={<CreateJob/>}/>
        <Route path='/dashboard/:id' element={<EditJob/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      
    </div>
  )
}

export default App
