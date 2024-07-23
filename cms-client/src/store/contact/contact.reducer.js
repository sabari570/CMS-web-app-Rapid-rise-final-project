import { createSlice } from "@reduxjs/toolkit";

const INITIAL_CONTACT_DATA = {
  selectedContact: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState: INITIAL_CONTACT_DATA,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
  },
});

export const { setSelectedContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
