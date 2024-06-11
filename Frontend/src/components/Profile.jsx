import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
const Profile = () => {
  const isAuthenticated = useSelector(state => state.user.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [currentID,setCurrentId]=useState("")
  useEffect(() => {
    const fetchCurrent = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/current`, {
        headers: {
          'auth': localStorage.getItem('auth')
        }
      });
      setCurrentId(data._id)
      
    };
    
    fetchCurrent();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/user/${params.id}`, {
          headers: {
            'auth': localStorage.getItem('auth')
          }
        });
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [params.id]);
  
  const profileEdit=async()=>{
    navigate(`/profile/${currentID}/edit`);
  }
  const follow=async(id)=>{
    const {data} =await axios.get(`http://localhost:3000/api/post/follow/${id}`,{
      headers:{
        'auth':localStorage.getItem('auth')
      }
    })
    if (data.what === "unfollowed") {
      setProfile(prevProfile => ({
        ...prevProfile,
        followers: prevProfile.followers.filter(follower => follower !== currentID)
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        followers: [...prevProfile.followers, currentID]
      }));
    }
  }
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-4">
            <img src={profile.avatar} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
            <div>
              <div className='flex items-center justify-between  gap-3'>
                <h1 className="text-2xl font-semibold">{profile.username} </h1>
                
                {params.id===currentID?
                <MdEdit onClick={profileEdit} className='hover:cursor-pointer' />:""}
              </div>
              
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          </div>

          {profile.followers.includes(currentID)?
            <button
            onClick={(e)=>(follow(params.id))}
            className={`p-2 italic text-slate-600 font-semibold`}>following</button>
            :
            <button
            onClick={(e)=>(follow(params.id))}
            className={`p-2 bg-indigo-600 text-white rounded-lg font-semibold my-4 ${currentID!==params.id?"":"hidden"}
            `}>follow</button>
          }
    
          <div className="flex mb-4">
              <div className="mr-8 ">
                <p className="font-semibold">{profile.followers.length}</p>
                <Link to={`/profile/${params.id}/followers`}>
                    <p className="text-gray-600 hover:cursor-pointer">Followers</p>
                </Link>
              </div>
              <div className="mr-8 ">
                <p className="font-semibold">{profile.following.length}</p>
                <Link to={`/profile/${params.id}/following`}>
                    <p className="text-gray-600 hover:cursor-pointer">Following</p>
                </Link>
              </div>
          </div>

        
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 pb-6 mt-10 place-items-start">
            {profile.posts.map(post => (
              <div className='hover:scale-105 duration-300 rounded-md shadow-md overflow-hidden '  key={post._id}>
                <Link to={`/comment/${post._id}`}>
                  <div className="max-w-96 ">
                    <img src={post.image} alt="Post" className="w-96 h-auto object-cover" />
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <img src={profile.avatar} alt="Author" className="w-8 h-8 rounded-full mr-2" />
                        <p className="text-gray-700">{profile.username}</p>
                      </div>
                      <p className="text-gray-800 mb-4">{post.caption}</p>
                      <div className="flex justify-between text-gray-600">
                        <div>
                          <span className="mr-2">{post.likes.length} Likes</span>
                          <span className="mr-2">{post.comments.length} Comments</span>
                        </div>
                        <div>
                          <button className="mr-2 focus:outline-none"><i className="far fa-heart"></i></button>
                          <button className="mr-2 focus:outline-none"><i className="far fa-comment"></i></button>
                          <button className="focus:outline-none"><i className="far fa-bookmark"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
