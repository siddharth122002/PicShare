import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { Link } from 'react-router-dom';
function People() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    const getUsers = async()=>{
        const {data} = await axios.get('http://localhost:3000/api/people',{
          headers:{
            'auth':localStorage.getItem('auth')
          }
        })
        setUsers(data.users);
    }
    getUsers();
  },[])


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">People</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {users.map(user => (
          <div key={user._id}>
          <Link to={`/profile/${user._id}`}>
            <div 
            className="w-64 p-4 bg-white shadow-md rounded-lg text-center hover:scale-105 duration-300 hover:cursor-pointer">
                <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src={user.avatar}
                />
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-600">{user.bio}</p>
            </div>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
