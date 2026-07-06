import { configureStore } from "@reduxjs/toolkit";
import { attributeApi } from "./slice/attributeSlice";
export const store = configureStore({
  reducer: {
    [attributeApi.reducerPath]: attributeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(attributeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
