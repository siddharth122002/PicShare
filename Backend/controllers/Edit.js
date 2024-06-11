const Users = require('../models/User');
const Posts = require('../models/Post');

const profileEdit = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, bio, avatar } = req.body;

    await Users.findByIdAndUpdate(userId, { username, bio, avatar });

    res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, file } = req.body;

    await Posts.findByIdAndUpdate(id, {
      caption,
      image: file,
    });

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { profileEdit, updatePost };
