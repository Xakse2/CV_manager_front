import { configureStore } from "@reduxjs/toolkit";
import { attributeApi } from "./slice/api/attributeApi";
import { vacanciesApi } from "./slice/api/vacancyApi";
import { authApi } from "./slice/api/authApi";
import authReducer from "./slice/authSlice";
import { userApi } from "./slice/api/userApi";
import { cvApi } from "./slice/api/cvApi";
import { userAttributeApi } from "./slice/api/userAttributeApi";
import { projectApi } from "./slice/api/projectApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [attributeApi.reducerPath]: attributeApi.reducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cvApi.reducerPath]: cvApi.reducer,
    [userAttributeApi.reducerPath]: userAttributeApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      attributeApi.middleware,
      vacanciesApi.middleware,
      authApi.middleware,
      userApi.middleware,
      cvApi.middleware,
      userAttributeApi.middleware,
      projectApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
