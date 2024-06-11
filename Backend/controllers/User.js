const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "iambatman";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).send('Incorrect email or password');
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).send('Incorrect email or password');
    }

    const token = jwt.sign({ id: user._id }, secret);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: "Hi!"
    });

    const token = jwt.sign({ id: newUser._id }, secret);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const current = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await Users.findById(id).select('username avatar bio');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const userDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id).select('username avatar bio followers following posts').populate('posts');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const topCreators = async (req, res) => {
  try {
    const topCreators = await Users.find().sort({ followers: -1 }).limit(10).select('username avatar followers');
    res.json({
      success: true,
      topCreators,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const people = async (req, res) => {
  try {
    const users = await Users.find().select('username avatar bio');
    res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { login, register, current, userDetails, topCreators, people };
