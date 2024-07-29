import { createSlice } from "@reduxjs/toolkit";

const INITIAL_SPLASH_STATE = {
  showSplash: false,
};

const splashSlice = createSlice({
  name: "splash",
  initialState: INITIAL_SPLASH_STATE,
  reducers: {
    setShowSplash: (state, action) => {
      state.showSplash = action.payload;
    },
  },
});

export const { setShowSplash } = splashSlice.actions;
export const splashReducer = splashSlice.reducer;
