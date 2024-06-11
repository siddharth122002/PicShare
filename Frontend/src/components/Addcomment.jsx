import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddComment = () => {
  const [current,setCurrent]=useState("")
  const params = useParams();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/post/${params.id}`, {
        headers: {
          'auth': localStorage.getItem('auth')
        }
      });

      setPost(data.post);
      setComments(data.post.comments);
      setLoading(false);
      setCurrent(data.current)
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return;
    try {
      const { data } = await axios.post(`http://localhost:3000/api/post/${params.id}`, { newComment }, {
        headers: {
          'auth': localStorage.getItem('auth')
        }
      });

      fetchPost(); 
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const handleDelete=async(id)=>{
    const { data } = await axios.delete(`http://localhost:3000/api/post/${params.id}/comment/${id}`,{
      headers: {
        'auth': localStorage.getItem('auth')
      }
    });

    fetchPost()
  }
  return (
    <>
      {loading ? <h1>Loading...</h1> :
        <div className="container mx-auto p-4 md:max-w-[40%]  w-full">
          <div className="m rounded-lg border-2 mb-4">
            <div className='bg-slate-100 flex items-center justify-center'>
              <img src={post.image} alt="Post" className="max-h-screen w-auto object-contain" />
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img src={post.owner.avatar} alt="Author" className="w-8 h-8 rounded-full mr-2" />
                <p className="text-gray-700">{post.owner.username}</p>
              </div>
              <p className="text-gray-800 mb-4">{post.caption}</p>
            </div>
          </div>

          <div className="mb-4">
            {comments.map((c, i) => (
              <div key={i} className="flex flex-col mb-8 mt-4">
                <div className='flex'>
                  <img src={c.user.avatar} alt="Commenter" className="w-6 h-6 rounded-full mr-2" />
                  <p className="text-gray-700 font-bold mr-2">{c.user.username}</p>
                  {current==c.user._id?
                <button 
                onClick={()=>handleDelete(c._id)}
                className='text-red-500 ml-4'>Delete</button>:""}
                </div>
                <p className="text-gray-700">{c.comment}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className=" focus:outline-none border p-2 w-full rounded-xl"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-2 py-1 bg-purple-500 rounded-lg text-white mt-2 "
            >
              Submit
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default AddComment;
