import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
const Posts = () => {
  const [posts,setPosts] = useState([]);
  const [currentId,setCurrentId]=useState("")
  useEffect(()=>{
    const getPosts=async()=>{
      const {data} =await axios.get('https://pic-share-omega.vercel.app/api/posts',{
        headers:{
          'auth':localStorage.getItem('auth')
        }
      })
      setCurrentId(data.current);
      setPosts(data.posts)
    }
    getPosts()
  },[])

  const deletes =async (id)=>{
    const {data} =await axios.delete(`https://pic-share-omega.vercel.app/api/post/${id}`,{
      headers:{
        'auth':localStorage.getItem('auth')
      }
    })
    setPosts(posts.filter(post => post._id !== id));
  }

  const follow=async(id)=>{
    const {data} =await axios.get(`https://pic-share-omega.vercel.app/api/post/follow/${id}`,{
      headers:{
        'auth':localStorage.getItem('auth')
      }
    })
    setPosts(data.posts)
    
  }
  const likes = async(id)=>{
    const {data} =await axios.get(`https://pic-share-omega.vercel.app/api/post/like/${id}`,{
      headers:{
        'auth':localStorage.getItem('auth')
      }
    })
    setPosts(data.posts)
  }
  const [openedPosts,setOpenedPosts]=useState({});
  const toggleOpened = (postId) => {
    setOpenedPosts(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };
  return (
    <div className="grid grid-cols-1 gap-6 pb-6">
      {posts.map((post,i) => (
        <div key={i} className=" rounded-lg border-2 ">
          <div className='bg-slate-100 flex items-center justify-center'>
            <img src={post.image} alt="Post" className=" w-auto h-auto object-contain" /> 
          </div>
          <div className="p-4 relative">
            <div className="flex items-center mb-2 ">
              <img src={post.owner.avatar} alt="Author" className="w-8 h-8 rounded-full mr-2" />
              <Link to={`/profile/${post.owner._id}`}>
                <p className="text-gray-700">{post.owner.username}</p>
              </Link>


              {post.owner.followers.includes(currentId)?
                <button
                onClick={(e)=>(follow(post.owner._id))}
                className={`p-2 italic text-slate-600 font-semibold`}>following</button>
                :
                <button
                onClick={(e)=>(follow(post.owner._id))}
                className={`p-2 text-indigo-600 font-semibold ${currentId!==post.owner._id?"":"hidden"}
                `}>follow</button>
              }
              
              
               {currentId===post.owner._id?
                <>
                  
                <HiOutlineDotsHorizontal
                onClick={()=>toggleOpened(post._id)}
                className='absolute right-4 ml-auto cursor-pointer' />
                {openedPosts[post._id]?
                    <>
                      <div className='absolute right-4 mt-28 w-20 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5 z-50'>
                        <Link to={`/post/edit/${post._id}`}
                        
                        className={'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'}>Edit</Link>

                        <div 
                          onClick={()=>(deletes(post._id))}
                          className={'px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer'}>Delete
                        </div>
                      </div>
                    </>
                    :
                    null
                  }
                </>
              :null}
            </div>
            <p className="text-gray-800 mb-4">{post.caption}</p>
            <div className="flex justify-between text-gray-600">
              <div className=''>

                <div className='flex'>
                  <span
                  onClick={()=>(likes(post._id))}
                  className="mr-2 hover:cursor-pointer">{post.likes.length} 
                  {post.likes.includes(currentId)?<AiFillLike />:<SlLike />}
                 
                  </span>
                  
                  <Link to={`/comment/${post._id}`}>
                  <span
                  className="mr-2 hover:cursor-pointer ">{post.comments.length} <FaRegComment />
                  </span>
                </Link>
                </div>
                  
              </div>
              
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
