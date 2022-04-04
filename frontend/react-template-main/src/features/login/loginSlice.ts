/* eslint-disable no-console */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { loginUser } from './LoginService';
import { CurrentUser } from './modelLogin';

interface InitialState {
  username: string;
  password: string;
  token: string;
  refreshToken: string;
  tokens: object;
  isLoggedIn: boolean;
  loading: string;
  errMessage: string;
  showModal: boolean;
  errStatus: number;
  currentUser: CurrentUser;
}
const initialState: InitialState = {
  username: '',
  password: '',
  token: '',
  refreshToken: '',
  tokens: {},
  isLoggedIn: false,
  loading: '',
  errMessage: '',
  errStatus: 0,
  showModal: false,
  currentUser: {
    id: '',
    email: '',
    exp: null,
    iat: null,
    type: '',
    userType: '',
  },
};

export const userLoginAndTokens = createAsyncThunk(
  'login/userLoginAndTokens',
  async (obj: object) => loginUser(obj),
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    getPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearInputs: (state) => {
      state.username = '';
      state.password = '';
    },
    userTokens: (state, action: PayloadAction<object>) => {
      state.tokens = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.errStatus = action.payload;
    },
    setModal: (state, action) => {
      state.showModal = action.payload;
    },

    restartToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.refreshToken = '';
      localStorage.removeItem('userJwt');
      state.loading = '';
      state.errMessage = '';
      state.currentUser = {
        id: '',
        email: '',
        exp: null,
        iat: null,
        type: '',
        userType: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginAndTokens.pending, (state) => {
      // state.isLoggedIn = false;
      state.loading = 'pending';
    });
    builder.addCase(userLoginAndTokens.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.currentUser = jwtDecode(action.payload.accessToken);
      localStorage.setItem('userJwt', JSON.stringify(state.refreshToken));
      state.isLoggedIn = true;
      state.loading = 'finished';
    });
    builder.addCase(userLoginAndTokens.rejected, (state) => {
      state.isLoggedIn = false;
      state.loading = 'rejected';
    });
  },
});

// eslint-disable-next-line operator-linebreak
export const {
  getUsername,
  getPassword,
  clearInputs,
  userTokens,
  logoutUser,
  restartToken,
  setErrorMessage,
  setErrorStatus,
  setModal,
} = loginSlice.actions;
export default loginSlice.reducer;
