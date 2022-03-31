/* eslint-disable no-console */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deletePost } from '../../components/post/DeletePostService';
import { createPost } from './NewPostService';

interface InitialState {
  newPostName: string;
  newPostPlace: string;
  newPostAccessibility: string;
  newPostType: string;
  newPostDescription: string;
  status: string;
}
const initialState: InitialState = {
  newPostName: '',
  newPostPlace: '',
  newPostAccessibility: '',
  newPostType: '',
  newPostDescription: '',
  status: '',
};

export const createNewPost = createAsyncThunk(
  'newPost/createNewPost',
  async (data: { obj: {}; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    createPost(data.obj, data.token),
);

// DELETE POST
export const deletePostId = createAsyncThunk(
  'homescreen/deleteLikeId',
  async (data: { postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    deletePost(data.postId, data.token),
);

const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    setPostName: (state, action: PayloadAction<string>) => {
      state.newPostName = action.payload;
    },
    setPostPlace: (state, action: PayloadAction<string>) => {
      state.newPostPlace = action.payload;
    },
    setPostAccessibility: (state, action: PayloadAction<string>) => {
      state.newPostAccessibility = action.payload;
    },
    setPostType: (state, action: PayloadAction<string>) => {
      state.newPostType = action.payload;
    },
    setPostDescription: (state, action: PayloadAction<string>) => {
      state.newPostDescription = action.payload;
    },
    clearPostInputs: (state) => {
      state.newPostName = '';
      state.newPostPlace = '';
      state.newPostAccessibility = '';
      state.newPostType = '';
      state.newPostDescription = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.status = 'finished';
      console.log(action.payload);
    });
    builder.addCase(createNewPost.rejected, (state) => {
      state.status = 'rejected';
    });

    // delete post
    builder.addCase(deletePostId.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(deletePostId.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const {
  setPostName,
  setPostPlace,
  setPostAccessibility,
  setPostType,
  setPostDescription,
  clearPostInputs,
} = newPostSlice.actions;
export default newPostSlice.reducer;
