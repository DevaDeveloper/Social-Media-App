import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getLikeId,
  PostLike,
  fetchLikeId,
  deleteLike,
  putLike,
} from '../../components/post/PostLikesService';
import { getUserPosts } from './GetPostsService';
import { UserPosts, PostId } from './modelPosts';
import { getPostId } from './PostIdService';

// TODO MAKE SERVICE FOR POSTS AND CHANGE GET POSTS
// REDUCER FUNC(EXTRA REDUCERS..) TO HANDLE REEQUEST STATES

interface InitialState {
  isLoading: boolean;
  postsList: UserPosts[];
  status: string;
  postWithId: PostId;
  currentPostLikesCount: number;
}

const initialState: InitialState = {
  isLoading: false,
  postsList: [],
  status: '',
  currentPostLikesCount: 0,
  postWithId: {
    id: '',
    // username: string;
    accessibility: '',
    type: '',
    createdAt: '',
    description: '',
    idUser: '',
    likescount: '',
    location: '',
    downvotes: 10,
    comments: 24,
    // updatedAt: ''
  },
};

export const fetchAllPosts = createAsyncThunk(
  'homescreen/fetchAllPosts',
  async (token: string) => getUserPosts(token),
);

export const fetchOnePost = createAsyncThunk(
  'homescreen/fetchOnePost',
  async (data: { token: string; postId: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getPostId(data.token, data.postId),
);

export const postLike = createAsyncThunk(
  'homescreen/postLike',
  async (data: { obj: {}; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    PostLike(data.obj, data.token),
);

export const getLikeWithId = createAsyncThunk(
  'homescreen/getLikeWithId',
  async (data: { postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getLikeId(data.postId, data.token),
);

export const fetchLikeWithId = createAsyncThunk(
  'homescreen/fetchLikeWithId',
  async (data: { postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    fetchLikeId(data.postId, data.token),
);

// delete like
export const deleteLikeId = createAsyncThunk(
  'homescreen/deleteLikeId',
  async (data: { postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    deleteLike(data.postId, data.token),
);

// put like
export const putLikeId = createAsyncThunk(
  'homescreen/putLikeId',
  async (data: { obj: {}; postId: string; token: string }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    putLike(data.obj, data.postId, data.token),
);

const homeScreenSlice = createSlice({
  name: 'homescreen',
  initialState,
  reducers: {
    getAllPosts(state, action) {
      state.postsList = action.payload;
    },
    getPostLikes(state, action) {
      state.currentPostLikesCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.status = 'finished';
      state.postsList = action.payload;
    });
    builder.addCase(fetchAllPosts.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(fetchOnePost.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchOnePost.fulfilled, (state, action) => {
      state.postWithId = action.payload;
      console.log(state.postWithId);
    });

    // builder.addCase(postLike.pending, (state) => {
    //   state.status = 'pending';
    // });
    builder.addCase(postLike.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(postLike.rejected, (state) => {
      state.status = 'rejected';
    });

    builder.addCase(getLikeWithId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getLikeWithId.fulfilled, (state, action) => {
      state.status = 'finished';
      console.log(action.payload);
    });
    builder.addCase(getLikeWithId.rejected, (state) => {
      state.status = 'rejected';
    });

    //  get/like/id
    builder.addCase(fetchLikeWithId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchLikeWithId.fulfilled, (state, action) => {
      state.status = 'finished';
      console.log(action.payload);
    });
    builder.addCase(fetchLikeWithId.rejected, (state) => {
      state.status = 'rejected';
    });

    // delete/like
    builder.addCase(deleteLikeId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteLikeId.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(deleteLikeId.rejected, (state) => {
      state.status = 'rejected';
    });

    // put/like
    builder.addCase(putLikeId.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(putLikeId.fulfilled, (state) => {
      state.status = 'finished';
    });
    builder.addCase(putLikeId.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { getAllPosts, getPostLikes } = homeScreenSlice.actions;
export default homeScreenSlice.reducer;
