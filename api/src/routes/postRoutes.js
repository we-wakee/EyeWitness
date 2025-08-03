const express = require('express');
const Post = require('../models/postModel');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get all posts (dashboard)
router.get('/posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get current user's posts
router.get('/all-posts', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user posts' });
  }
});

// Get single post by slug
router.get('/post/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving post' });
  }
});

// Create new post
router.post('/add-post', authMiddleware, upload.single('crimeImage'), async (req, res) => {
  try {
    const { crimeType, crimeLocation, crimeDescription } = req.body;
    const crimeImage = req.file?.filename || null;

    const newPost = new Post({
      crimeType,
      crimeLocation,
      crimeDescription,
      crimeImage,
      userId: req.user._id, 
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Edit existing post
router.put('/edit-post/:slug', authMiddleware, upload.single('crimeImage'), async (req, res) => {
  try {
    console.log("User from token:", req.user); // ADD THIS
    const { crimeType, crimeLocation, crimeDescription } = req.body;
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    post.crimeType = crimeType;
    post.crimeLocation = crimeLocation;
    post.crimeDescription = crimeDescription;

    if (req.file?.filename) {
      post.crimeImage = req.file.filename;
    }

    await post.save();
    res.json({ message: 'Post updated', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

module.exports = router;
