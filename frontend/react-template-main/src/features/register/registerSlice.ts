import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
  date: string;
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
};

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
} = registerSlice.actions;
export default registerSlice.reducer;
