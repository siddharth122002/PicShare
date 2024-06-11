const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar:{
    type:String,
  },
  bio:{
    type:String,
  },
  followers: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    }
  ],
  following: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    }
  ],
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post',
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
