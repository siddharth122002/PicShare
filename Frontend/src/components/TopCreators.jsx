import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
function TopCreators() {
  const [creators,setCreators] = useState([])
  useEffect(()=>{
    const getTopCreators = async()=>{
        const {data} = await axios.get('https://pic-share-omega.vercel.app/api/top-creators',{
          headers:{
            'auth':localStorage.getItem('auth')
          }
        })
        setCreators(data.topCreators);
    }
    getTopCreators();
  },[])
 

  return (
    <div className="p-4 bg-white rounded-xl w-full">
      <h2 className="text-2xl font-semibold mb-8 text-purple-600">Top Creators</h2>
      
        {creators.map(creator => (
          <div key={creator._id} className="flex p-2 shadow mb-8 items-center">
            <Link to={`/profile/${creator._id}`}>
              <img 
                src={creator.avatar} 
                className="w-12 h-12 rounded-full mr-4 border-2 border-purple-600" 
              />
              <div>
                <h3 className="text-lg font-medium text-purple-800">{creator.username}</h3>
                <p className="text-gray-500">{creator.followers.length.toLocaleString()} followers</p>
              </div>
            </Link>
          </div>
        ))}
  
    </div>
  );
}

export default TopCreators;
