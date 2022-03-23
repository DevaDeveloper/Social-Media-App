import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  postComment,
  getComment,
  getCommentId,
  patchComment,
  deleteComment,
} from '../PostCommentsService';

interface InitialState {
  postComments: [];
  status: string;
  text: string;
}

const initialState: InitialState = {
  postComments: [],
  status: '',
  text: '',
};

// post comment
export const postNewComment = createAsyncThunk(
  'postAndComments/postNewComment',
  async (data: { obj: {}; token: string }) => postComment(data.obj, data.token),
);

// get comment
export const getNewComment = createAsyncThunk(
  'postAndComments/getNewComment',
  async (token: string) => getComment(token),
);

// get comment {id}
export const getCommentWithId = createAsyncThunk(
  'postAndComments/getCommentWithId',
  async (data: { postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getCommentId(data.postId, data.token),
);

// patch comment {id}
export const patchCommentWithId = createAsyncThunk(
  'postAndComments/patchCommentWithId',
  async (data: { obj: {}; postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    patchComment(data.obj, data.postId, data.token),
);

// delete comment {id}
export const deleteCommentWithId = createAsyncThunk(
  'postAndComments/deleteCommentWithId',
  async (data: { postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    deleteComment(data.postId, data.token),
);

const PostAndCommentsSlice = createSlice({
  name: 'postAndComments',
  initialState,
  reducers: {
    getCommentInput: (state, action) => {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    // add new comment
    builder.addCase(postNewComment.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(postNewComment.rejected, (state) => {
      state.status = 'rejected';
    });

    // get comment
    builder.addCase(getNewComment.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getNewComment.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(getNewComment.rejected, (state) => {
      state.status = 'rejected';
    });

    // get comment {id}
    builder.addCase(getCommentWithId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getCommentWithId.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(getCommentWithId.rejected, (state) => {
      state.status = 'rejected';
    });

    //  patch comment {id}
    builder.addCase(patchCommentWithId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(patchCommentWithId.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(patchCommentWithId.rejected, (state) => {
      state.status = 'rejected';
    });

    // delete comment {id}
    builder.addCase(deleteCommentWithId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteCommentWithId.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(deleteCommentWithId.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { getCommentInput } = PostAndCommentsSlice.actions;
export default PostAndCommentsSlice.reducer;
