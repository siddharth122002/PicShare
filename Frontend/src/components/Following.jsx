import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link} from 'react-router-dom';
const Following = () => {
    const params = useParams() 
    const [following, setfollowing] = useState([]);
    useEffect(() => {
      const fetchfollowing = async () => {
        try {
          const { data } = await axios.get(`https://pic-share-omega.vercel.app/api/${params.id}/following`, {
            headers: {
              'auth': localStorage.getItem('auth')
            }
          });
          setfollowing(data.following)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchfollowing();
    }, []);

    const [currentID,setCurrentID]=useState("")
    useEffect(() => {
      const current = async () => {
        try {
          const { data } = await axios.get(`https://pic-share-omega.vercel.app/api/current`, {
            headers: {
              'auth': localStorage.getItem('auth')
            }
          });

          setCurrentID(data._id)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      current();
    }, []);

  const handleUnfollow = async(id) => {
    const {data} =await axios.get(`https://pic-share-omega.vercel.app/api/post/follow/${id}`,{
      headers:{
        'auth':localStorage.getItem('auth')
      }
    })


    setfollowing(prevfollowing => prevfollowing.filter(follow => follow._id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Following</h2>
      {following.length === 0 ? (
        <p className="text-center text-gray-500">Loading following...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {following.map(follow => (
          <div  key={follow._id}>
            <Link to={`/profile/${follow._id}`}>
                <li className="mt-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center">
                  <img className="w-10 h-10 rounded-full" src={follow.avatar} alt={follow.name} />
                  <div className="ml-3 flex-grow">
                    <p className="text-lg font-medium text-gray-900">{follow.name}</p>
                    <p className="text-sm text-gray-500">{follow.username}</p>
                  </div>
                  {currentID===params.id?
                  <button
                    className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleUnfollow(follow._id)}
                  >
                    Unfollow
                  </button>
                  :""}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Following;


