import { createSelector } from "@reduxjs/toolkit";

const selectSplash = (state) => state.splash;

export const selectShowSplash = createSelector(
  [selectSplash],
  (splash) => splash.showSplash
);
