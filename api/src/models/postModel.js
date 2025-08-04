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

  slug: {
    type: String,
    required: false,
    unique: true,
    sparse: true, // Allow multiple null values
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

// Pre-save middleware to generate slug
postSchema.pre('save', function(next) {
  // Always generate a slug if it doesn't exist or if crimeType/crimeLocation changed
  if (!this.slug || this.isModified('crimeType') || this.isModified('crimeLocation')) {
    const baseSlug = `${this.crimeType}-${this.crimeLocation}`.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    this.slug = `${baseSlug}-${Date.now()}`;
  }
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
