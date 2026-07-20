import { configureStore } from "@reduxjs/toolkit";
import { attributeApi } from "./slice/api/attributeApi";
import { vacanciesApi } from "./slice/api/vacancyApi";
import { authApi } from "./slice/api/authApi";
import authReducer from "./slice/authSlice";
import { userApi } from "./slice/api/userApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [attributeApi.reducerPath]: attributeApi.reducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      attributeApi.middleware,
      vacanciesApi.middleware,
      authApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
