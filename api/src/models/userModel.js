const mongoose = require("mongoose")
const jwt= require('jsonwebtoken')
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    
  },
  { timestamps: true } // ✅ automatically adds createdAt & updatedAt
);

userSchema.methods.getJWT = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
        process.env.JWT_SECRET, // replace with .env later
    { expiresIn: '3d' }
  );
  return token;
};

module.exports = mongoose.model('User', userSchema);
