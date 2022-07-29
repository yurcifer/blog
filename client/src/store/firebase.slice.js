import { createSlice } from '@reduxjs/toolkit';

export const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: { auth: null, app: null },
  reducers: {
    init(state, { payload }) {
      state.auth = payload.auth;
      state.app = payload.app;
    },
  },
});

export const firebaseActions = firebaseSlice.actions;
export const { init } = firebaseSlice.actions;
export default firebaseSlice.reducer;
