const {createPost, allPosts, getPost, addComment, like, deleteComment, deletePost} = require('../controllers/Post')
const {login,register, userDetails,current, topCreators, people} = require('../controllers/User');
const { profileEdit, updatePost } = require('../controllers/Edit');
const { followUnfollow, getFollowing,getFollowers } = require('../controllers/Follow');

const jwt = require('jsonwebtoken');
const secret="iambatman";
const express = require('express');
const router = express.Router();

const multer = require('multer');
const {storage} = require('../utilities/cloudinary');
const upload = multer({storage})




const isLoggedIn = async(req,res,next)=>{
    const token = req.headers['auth'];
    const pass = jwt.verify(token,secret);
    req.user = pass;
    if(!pass){
        return res.status(400).send("Login again")
    }
    next();
}


router.post('/login',login)
router.post('/register',register)
router.post('/create',isLoggedIn,upload.none(),createPost)
router.get('/posts',isLoggedIn,allPosts)
router.get('/user/:id',isLoggedIn,userDetails)
router.get('/current',isLoggedIn,current)
router.get('/top-creators',isLoggedIn,topCreators)
router.get('/people',isLoggedIn,people)
router.put('/profile/:id/edit', isLoggedIn,profileEdit);
router.get('/post/:id',isLoggedIn,getPost)
router.put('/post/:id',isLoggedIn,updatePost)
router.get('/post/follow/:id', isLoggedIn, followUnfollow);
router.get('/:id/followers',isLoggedIn,getFollowers)
router.get('/:id/following',isLoggedIn,getFollowing)
router.get('/post/like/:id', isLoggedIn,like);
router.post('/post/:id',isLoggedIn,addComment)
router.delete('/post/:idpost/comment/:idcomment',isLoggedIn,deleteComment)
router.delete('/post/:id',deletePost)

module.exports =router;