import React, { useState } from 'react'
import Posts from './Posts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate ,Link} from 'react-router-dom';
import {useEffect} from 'react'
import { MdHome, MdMenu, MdClose } from 'react-icons/md';
import { FaPeopleGroup } from "react-icons/fa6";
import TopCreators from './TopCreators';
import { IoCreate } from "react-icons/io5";
function Home() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state=>state.user.auth)
  useEffect(()=>{
    if(!isAuthenticated){
      return navigate('/')
    }
  },[])
  
  const [isOpen,setIsOpen] = useState(false);
  const toggle=()=>{
    setIsOpen(!isOpen)
  }


  return (
    <div className="max-w-7xl mx-auto px-4 pt-4" >
      <div className=' grid grid-cols-1 md:grid-cols-7 gap-4'>

      <div className='md:hidden flex justify-between items-center p-4'>
          <button onClick={toggle} className="text-2xl">
            {isOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>


        <div className={`col-span-2 md:block bg-white p-4 rounded-lg
        ${isOpen?"block":"hidden"}`}>
            <div className="flex flex-col space-y-10 text-indigo-600 font-semibold sticky top-24 ">
              <span className='flex justify-center items-center text-lg gap-2'>
                <MdHome  className='text-2xl'/>
                <a href="/home" className="hover:text-indigo-800">Home</a>

              </span>

              <span className='flex justify-center items-center text-lg gap-2'>
                <FaPeopleGroup  className='text-2xl'/>
                <Link to="/people" className="hover:text-indigo-800">People</Link>
              </span>


              {/* <span className='flex justify-center items-center text-lg gap-2'>
                <BsFillSaveFill  className='text-xl'/>
                <Link to="/people" className="hover:text-indigo-800">Saved Posts</Link>
              </span> */}

              <span className='flex justify-center items-center text-lg gap-2'>
                <IoCreate  className='text-2xl'/>
                <Link to="/create" className="hover:text-indigo-800">Create Posts</Link>
              </span>

            </div>
        </div>

        <div className="mx-auto max-w-xl  flex col-span-1 md:col-span-3  mb-8">
          <Posts/>
        </div>
        <div className='col-span-2 md:flex justify-end items-start hidden'>
          <TopCreators/>
        </div>
      </div>
    </div>
  )
}

export default Home