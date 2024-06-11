import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Editprofile() {
  const isAuthenticated = useSelector(state => state.user.auth);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    avatar: ''
  });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('https://pic-share-omega.vercel.app/api/current', {
          headers: {
            'auth': localStorage.getItem('auth')
          }
        });
        setProfileData({
          username: data.username,
          bio: data.bio,
          avatar: data.avatar
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`https://pic-share-omega.vercel.app/api/profile/${params.id}/edit`, profileData, {
        headers: {
          'auth': localStorage.getItem('auth')
        }
      });
      navigate(`/profile/${params.id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={profileData.avatar}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
              />
            </div>
            <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Save</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Editprofile;
