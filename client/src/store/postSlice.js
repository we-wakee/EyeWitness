import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload); // newest on top
    },

    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { setPost, addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
