import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Attribute, CreateAttributeInput } from "../../types/attribute";

export const attributeApi = createApi({
  reducerPath: "attributeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  }),
  tagTypes: ["Attribute"],
  endpoints: (builder) => ({
    getAttributes: builder.query<Attribute[], void>({
      query: () => "/attributes",
      providesTags: ["Attribute"],
    }),

    createAttribute: builder.mutation<Attribute, CreateAttributeInput>({
      query: (newAttribute) => ({
        url: "/attributes",
        method: "POST",
        body: newAttribute,
      }),
      invalidatesTags: ["Attribute"],
    }),

    deleteAttribute: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/attributes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attribute"],
    }),
  }),
});

export const {
  useGetAttributesQuery,
  useCreateAttributeMutation,
  useDeleteAttributeMutation,
} = attributeApi;
