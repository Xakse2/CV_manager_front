import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser, User } from "../../types/auth";

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: User;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, setAccessToken, clearAuth, setUser } =
  authSlice.actions;

export default authSlice.reducer;
