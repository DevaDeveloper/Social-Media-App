/* eslint-disable implicit-arrow-linebreak */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { blockUser, getUsers } from './AdminService';

interface FetchedUsers {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userType: string;
  isActive: boolean;
  dateOfBirth: string;
}

interface InitialState {
  usersArr: FetchedUsers[];
  status: string;
  blockedUsers: object[];
}

const initialState: InitialState = {
  usersArr: [],
  status: '',
  blockedUsers: [],
};

export const getAllUsers = createAsyncThunk(
  'admin/getAllUsers',
  async (data: { token: string; query: {} }) =>
    getUsers(data.token, data.query),
);

export const blockUserId = createAsyncThunk(
  'admin/blockUserId',
  async (data: { obj: {}; token: string; idUser: any }) =>
    blockUser({}, data.token, data.idUser),
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = 'finished';
      state.usersArr = action.payload.data;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.status = 'rejected';
    });

    // block user with id
    builder.addCase(blockUserId.fulfilled, (state, action) => {
      state.status = 'finished';
      state.blockedUsers.push(action.payload);
    });
    builder.addCase(blockUserId.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export default adminSlice.reducer;
