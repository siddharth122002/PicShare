import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { changeAuth } from '../reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux'
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state=>state.user.auth);
  useEffect(()=>{
    if(isAuthenticated){
      return navigate('/home')
    }
  },[])

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const Login=async(e)=>{
    e.preventDefault();
    try{
      const {data} =await axios.post('https://pic-share-omega.vercel.app/api/login',{
        email,
        password,
      })
      localStorage.setItem('auth',data.token);
      dispatch(changeAuth(localStorage.getItem('auth')))
      navigate('/home')
    }catch(err){
      console.log("Error is:",err)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md">
        <div className="bg-white py-8 shadow-2xl rounded-lg px-10">

          <form className="space-y-4" onSubmit={(e)=>(Login(e))}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                id="email" name="email" type="email" autoComplete="email" required className=" block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                id="password" name="password" type="password" autoComplete="current-password" required className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to={'/register'} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Dont have an account?
                </Link>
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4  rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500">
                Log In
              </button>
            </div>
          </form>

        </div>
      </div>
      
    </div>
  )
}

export default Login