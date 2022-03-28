import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signupUser } from './RegisterService';

interface InitialState {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
  date: string;
  users: object[];
  loading: string;
  errMessage: string;
}

const initialState: InitialState = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  date: '2022-03-14',
  users: [],
  loading: '',
  errMessage: '',
};

export const signUpAsync = createAsyncThunk(
  'register/signUpAsync',
  async (obj: object) => signupUser(obj),
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerFirstname: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    registerLastname: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    registerUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    registerEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    registerPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    registerConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    registerRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    registerDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    pushUser: (state, action) => {
      state.users.push(action.payload);
    },
    clearForm: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
      state.role = '';
      state.date = '';
    },
    clearLoadingState: (state) => {
      state.loading = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = 'fulfilled';
    });
    builder.addCase(signUpAsync.rejected, (state, { error }) => {
      state.loading = 'rejected';
      state.errMessage = error.message;
    });
  },
});
export const {
  registerFirstname,
  registerLastname,
  registerUsername,
  registerEmail,
  registerPassword,
  registerConfirmPassword,
  registerRole,
  registerDate,
  clearForm,
  pushUser,
  clearLoadingState,
} = registerSlice.actions;
export default registerSlice.reducer;
