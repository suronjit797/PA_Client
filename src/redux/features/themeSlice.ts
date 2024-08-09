import { createSlice } from "@reduxjs/toolkit";

const initialState:{isDark: boolean} = {
  isDark: true,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { setTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;
export default themeReducer;
