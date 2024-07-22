import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHeaderModalOpen: false,
};

export const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setHeaderModel: (state) => {
      state.isHeaderModalOpen = !state.isHeaderModalOpen;
    },
  },
});

export const { setHeaderModel } = helperSlice.actions;
const helperReducer = helperSlice.reducer;
export default helperReducer;
