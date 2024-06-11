import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function Create() {
    const navigate = useNavigate();
    const [link,setLink] = useState("");
    const [caption,setCaption] = useState("");
    const handler = async(e)=>{
        e.preventDefault();
        const form = new FormData();
        form.set('caption', caption);
        form.set('link', link);
        const {data} =await axios.post('http://localhost:3000/api/create',form,{
                headers:{
                    'auth':localStorage.getItem('auth')
                }
            }
        )
        console.log(data);
        if(data.success){
            navigate('/home')
        }
    }
    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-semibold text-center mb-8">Create Post</h1>
            <form  
            onSubmit={(e)=>handler(e)}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <p className="block text-gray-700 font-bold mb-2">Upload Image's link:</p>
                    <input 
                    value={link}
                    onChange={(e)=>setLink(e.target.value)}
                    type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"/>
                
                </div>

                <div className="mb-4">
                    <label htmlFor="caption" className="block text-gray-700 font-bold mb-2">Caption:</label>
                    <textarea
                    value={caption}
                    onChange={(e)=>setCaption(e.target.value)}
                    id="caption"
                    name="caption"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                    ></textarea>
                </div>

                
                <button
                    type="submit"
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 cursor-pointer">Create post</button>
            </form>
        </div>
    );
}

export default Create;
