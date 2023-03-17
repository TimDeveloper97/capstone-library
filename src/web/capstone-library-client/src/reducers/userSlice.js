import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(window.localStorage.getItem("user"));

export const userSlice = createSlice({
  name: "user",
  initialState: user,
  reducers: {
  },
});


export const showUser = (state) => state.user;

export default userSlice.reducer;
