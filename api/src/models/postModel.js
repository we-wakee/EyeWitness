const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  crimeType: {
    type: String,
    required: true,
    trim: true,
  },

  crimeLocation: {
    type: String,
    required: true,
  },

  crimeDescription: {
    type: String,
    required: true,
  },

  crimeImage: {
    type: String,
    required: false, // will be filename from multer
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
