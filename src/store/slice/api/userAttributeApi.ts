import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQueryWithReauth";
import type {
  UserAttribute,
  CreateUserAttributeRequest,
  UpdateUserAttributeRequest,
} from "../../../types/userAttribute";

export const userAttributeApi = createApi({
  reducerPath: "userAttributeApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["UserAttribute"],

  endpoints: (builder) => ({
    getUserAttributes: builder.query<UserAttribute[], void>({
      query: () => ({
        url: "/me/attributes",
      }),

      providesTags: ["UserAttribute"],
    }),

    createUserAttribute: builder.mutation<
      UserAttribute,
      CreateUserAttributeRequest
    >({
      query: (body) => ({
        url: "/me/attributes",
        method: "POST",
        body,
      }),

      invalidatesTags: ["UserAttribute"],
    }),

    updateUserAttribute: builder.mutation<
      UserAttribute,
      UpdateUserAttributeRequest
    >({
      query: ({ attributeId, value }) => ({
        url: `/me/attributes/${attributeId}`,
        method: "PATCH",
        body: {
          value,
        },
      }),

      invalidatesTags: ["UserAttribute"],
    }),

    deleteUserAttribute: builder.mutation<void, string>({
      query: (attributeId) => ({
        url: `/me/attributes/${attributeId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["UserAttribute"],
    }),
  }),
});

export const {
  useGetUserAttributesQuery,
  useCreateUserAttributeMutation,
  useUpdateUserAttributeMutation,
  useDeleteUserAttributeMutation,
} = userAttributeApi;
