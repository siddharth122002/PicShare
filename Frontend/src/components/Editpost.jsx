import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
function Editpost() {
    const [caption,setCaption] = useState("");
    const [file,setFile] = useState("");
    const params =useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        const getData = async()=>{
            const {data} = await axios.get(`https://pic-share-omega.vercel.app/api/post/${params.id}`,{
                headers:{
                    'auth':localStorage.getItem('auth')
                }
            });
            setCaption(data.post.caption);
            setFile(data.post.image)
        }
        getData()
    },[])
    
    const handler = async(e)=>{
        e.preventDefault();
        const {data} = await axios.put(`https://pic-share-omega.vercel.app/api/post/${params.id}`,{
            caption,
            file,
        },{
            headers:{
                'auth':localStorage.getItem('auth')
            }
        });
        if(data.success){
            return navigate('/home')
        }
    }
    return (
        <div className="container mx-auto px-4 py-8">
        <form 
        onSubmit={(e)=>(handler(e))}
        className="max-w-lg mx-auto">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="caption">
                Caption
            </label>
            <input
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}
                id="caption"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your caption"
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image URL
            </label>
            <input
                value={file}
                onChange={(e)=>setFile(e.target.value)}
                id="image"
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Enter image URL"
            />
            </div>
            <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
            Save Changes
            </button>
        </form>
        </div>
    );
}

export default Editpost;
