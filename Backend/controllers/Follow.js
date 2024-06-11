const Users = require('../models/User');
const Posts = require('../models/Post');

const followUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const followed = await Users.findById(id);
    const follower = await Users.findById(req.user.id);

    if (!followed || !follower) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    let followOrUnfollow;
    if (followed.followers.includes(req.user.id)) {
      followed.followers = followed.followers.filter((followerId) => followerId.toString() !== req.user.id);
      follower.following = follower.following.filter((followingId) => followingId.toString() !== id);
      followOrUnfollow = "unfollowed";
    } else {
      followed.followers.push(req.user.id);
      follower.following.push(id);
      followOrUnfollow = "followed";
    }

    await followed.save();
    await follower.save();

    const allPosts = await Posts.find().populate('owner');
    res.status(200).json({
      success: true,
      posts: allPosts,
      what: followOrUnfollow,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id).populate({
      path: 'followers',
      select: 'avatar username',
    }).select('followers');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      followers: user.followers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id).populate({
      path: 'following',
      select: 'avatar username',
    }).select('following');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      following: user.following,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { followUnfollow, getFollowers, getFollowing };
