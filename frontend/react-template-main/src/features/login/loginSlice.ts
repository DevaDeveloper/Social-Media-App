import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  username: string;
  password: string;
}
const initialState: InitialState = {
  username: '',
  password: '',
};
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
  },
});

export const { getUsername, getPassword, clearInputs } = loginSlice.actions;
export default loginSlice.reducer;
