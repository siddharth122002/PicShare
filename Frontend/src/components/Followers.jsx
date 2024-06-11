import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const params = useParams() 
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await axios.get(`https://pic-share-omega.vercel.app/api/${params.id}/followers`, {
          headers: {
            'auth': localStorage.getItem('auth')
          }
        });
        setFollowers(data.followers)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchFollowers();
  }, []);


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Followers</h2>
      {followers.length === 0 ? (
        <p className="text-center text-gray-500">You dont have any followers</p>
      ) : (
        <ul className="">
          {followers.map(follower => (
            <div key={follower._id}>
            <Link to={`/profile/${follower._id}`}>
              <li  className="hover:cursor-pointer mt-4 p-4 bg-gray-100 hover:bg-gray-200 flex items-center rounded-xl">
                <img className="w-10 h-10 rounded-full" src={follower.avatar} alt={follower.username} />
                <div className="ml-3 flex-grow">
                  <p className="text-lg font-medium text-gray-900">{follower.username}</p>
                </div>
              </li>
            </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Followers;
