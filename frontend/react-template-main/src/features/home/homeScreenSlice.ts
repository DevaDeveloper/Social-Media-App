import { createSlice } from '@reduxjs/toolkit';
import { UserPosts } from './modelPosts';

// TODO MAKE SERVICE FOR POSTS AND CHANGE GET POSTS
// REDUCER FUNC(EXTRA REDUCERS..) TO HANDLE REEQUEST STATES

interface InitialState {
  isLoading: boolean;
  postsList: UserPosts[];
}

const initialState: InitialState = {
  isLoading: false,
  postsList: [],
};

const homeScreenSlice = createSlice({
  name: 'homescreen',
  initialState,
  reducers: {
    getAllPosts(state, action) {
      state.postsList = action.payload;
    },
  },
});

export const { getAllPosts } = homeScreenSlice.actions;
export default homeScreenSlice.reducer;
