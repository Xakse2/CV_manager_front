import { configureStore } from "@reduxjs/toolkit";
import { attributeApi } from "./slice/attributeSlice";
import { vacanciesApi } from "./slice/vacancySlice";
export const store = configureStore({
  reducer: {
    [attributeApi.reducerPath]: attributeApi.reducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      attributeApi.middleware,
      vacanciesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
