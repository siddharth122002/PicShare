const Users = require('../models/User');
const Posts = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { caption,link } = req.body;
    const newPost = await Posts.create({
      owner: req.user.id,
      caption,
      image: link
    });

    const owner = await Users.findById(req.user.id);
    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    owner.posts.push(newPost._id);
    await owner.save();

    res.status(200).json({
      success: true,
      message: "Post created",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const allPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find().populate('owner');
    res.status(200).json({
      success: true,
      posts: allPosts,
      current: req.user.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id).populate('owner').populate({
      path: 'comments.user',
      select: 'username avatar',
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post: post,
      current: req.user.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const { newComment } = req.body;
    post.comments.push({
      user: req.user.id,
      comment: newComment,
    });
    await post.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((likeId) => likeId.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    const allPosts = await Posts.find().populate('owner');
    res.status(200).json({
      success: true,
      posts: allPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { idpost, idcomment } = req.params;
    const post = await Posts.findById(idpost);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments = post.comments.filter(comment => comment._id.toString() !== idcomment);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createPost, allPosts, getPost, addComment, like, deleteComment, deletePost };
