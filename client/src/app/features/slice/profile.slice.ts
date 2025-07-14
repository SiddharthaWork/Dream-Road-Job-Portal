import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  completed: boolean;
}

const initialState: ProfileState = {
  completed: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileCompleted: (state, action: PayloadAction<boolean>) => {
      state.completed = action.payload;
    },
  },
});

export const { setProfileCompleted } = profileSlice.actions;
export default profileSlice.reducer;