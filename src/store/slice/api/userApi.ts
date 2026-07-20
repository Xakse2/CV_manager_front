import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQueryWithReauth";
import type { AuthUser } from "../../../types/auth";
import { setUser } from "../authSlice";

type UpdateProfileRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],

  endpoints: (builder) => ({
    updateProfile: builder.mutation<AuthUser, UpdateProfileRequest>({
      query: (body) => ({
        url: "/users/me",
        method: "PATCH",
        body,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
        } catch {}
      },
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
