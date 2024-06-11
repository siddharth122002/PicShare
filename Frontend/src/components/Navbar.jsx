import React, { useState,useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 
'react-router-dom';
import axios from 'axios';
import { changeAuth,dropDown } from '../reducers/userSlice';
function Navbar() {
  const isOpen = useSelector(state => state.user.isOpen)

  const navigate = useNavigate();
  const dispatch=useDispatch()
  
  const[userId,setUserId]=useState("")
  const [avatar,setAvatar]=useState("")
  useEffect(()=>{
    const getID=async()=>{
      const {data} =await axios.get(`http://localhost:3000/api/current`,{
        headers:{
          'auth':localStorage.getItem('auth')
        }
      })
      setUserId(data._id)
      setAvatar(data.avatar)
    }
    getID()
  },[])
  const open = () => {
    console.log(isOpen)
    dispatch(dropDown())
  }
  const logout = ()=>{
    open()
    localStorage.clear();
    dispatch(changeAuth(localStorage.getItem('auth')))
    return navigate('/')
  }
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-400 sticky top-0 w-full z-10">
      <div className=" mx-auto px-6 max-w-7xl relative ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={'/home'}>
              <div className='hover:cursor-pointer'>
                <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M27.8333 18C27.8333 25.0877 22.0877 30.8333 15 30.8333C7.91234 30.8333 2.16666 25.0877 2.16666 18C2.16666 10.9123 7.91234 5.16666 15 5.16666C22.0877 5.16666 27.8333 10.9123 27.8333 18ZM30 18C30 26.2843 23.2843 33 15 33C6.71573 33 0 26.2843 0 18C0 9.71573 6.71573 3 15 3C23.2843 3 30 9.71573 30 18ZM23.2759 11.2759C23.2759 12.1329 22.5812 12.8276 21.7242 12.8276C20.8672 12.8276 20.1725 12.1329 20.1725 11.2759C20.1725 10.4189 20.8672 9.72418 21.7242 9.72418C22.5812 9.72418 23.2759 10.4189 23.2759 11.2759ZM10.4879 19.209C11.1556 21.7009 13.717 23.1797 16.2089 22.512C18.7008 21.8443 20.1796 19.2829 19.5119 16.791C18.8442 14.2991 16.2828 12.8203 13.7909 13.488C11.299 14.1557 9.82015 16.7171 10.4879 19.209ZM8.39503 19.7698C9.37244 23.4175 13.1219 25.5823 16.7696 24.6049C20.4174 23.6274 22.5821 19.878 21.6047 16.2302C20.6273 12.5825 16.8779 10.4177 13.2301 11.3952C9.58236 12.3726 7.41762 16.122 8.39503 19.7698Z" fill="url(#paint0_linear_120_1360)"/>
                    <defs>
                      <linearGradient id="paint0_linear_120_1360" x1="15" y1="3" x2="15" y2="33" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="1" stopColor="cyan"/>
                      </linearGradient>
                    </defs>
                </svg>
              </div>
            </Link>
            
            <div className="md:block">
              <div className="ml-10 flex space-x-4">

                <div className='flex text-white text-2xl bg-indigo-600 items-center rounded-md px-2'>
                  <input type="text" className='md:w-full w-28 flex-1 text-white bg-transparent px-3 py-2 text-sm font-medium focus:outline-none' placeholder='Find people' />
                  <CiSearch className="text-white hover:cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div >
            <div className="ml-4 flex items-center ">
              <div className="ml-3">
                
                    <img
                    tabIndex={0}
                    onClick={open}
                    className="absolute top-3 right-4 h-10 w-10 rounded-full hover:cursor-pointer border-2 border-slate-700 focus:border-white" src={avatar} alt="" />
                    {isOpen &&
                    <div className="absolute right-4 mt-12 w-20 md:w-48 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5 z-50 ">
                      <div>
                        <Link to={`/profile/${userId}`} 
                        onClick={open}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <div 
                        
                        onClick={logout} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</div>
                      </div>
                    </div>
                    }
              </div>
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar

