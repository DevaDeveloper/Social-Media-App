import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './LoginService';

interface InitialState {
  username: string;
  password: string;
  token: string;
  refreshToken: string;
  tokens: object;
  isLoggedIn: boolean;
  loading: string;
  errMessage: string;
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
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.refreshToken = '';
      localStorage.removeItem('userJwt');
      state.loading = '';
      state.errMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginAndTokens.pending, (state) => {
      state.isLoggedIn = false;
      state.loading = 'pending';
    });
    builder.addCase(userLoginAndTokens.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('userJwt', JSON.stringify(state.refreshToken));
      state.isLoggedIn = true;
      state.loading = 'finished';
    });
    builder.addCase(userLoginAndTokens.rejected, (state, { error }) => {
      state.errMessage = error.message;
      state.isLoggedIn = false;
      state.loading = 'rejected';
    });
  },
});

// eslint-disable-next-line operator-linebreak
export const { getUsername, getPassword, clearInputs, userTokens, logoutUser } =
  loginSlice.actions;
export default loginSlice.reducer;
