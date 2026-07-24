import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQueryWithReauth";

import type {
  CreateCVRequest,
  CreateCVResponse,
  CVDetailResponse,
  CVListItem,
  UpdateCVAttributeRequest,
} from "../../../types/cv";

export const cvApi = createApi({
  reducerPath: "cvApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["CV"],

  endpoints: (builder) => ({
    getCVById: builder.query<CVDetailResponse, string>({
      query: (id) => ({
        url: `/cv/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "CV", id }],
    }),

    createCV: builder.mutation<CreateCVResponse, CreateCVRequest>({
      query: (body) => ({
        url: "/cv",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CV", id: "LIST" }],
    }),

    updateCVAttribute: builder.mutation<void, UpdateCVAttributeRequest>({
      query: ({ cvId, attributeId, value }) => ({
        url: `/cv/${cvId}/attribute`,
        method: "PATCH",
        body: {
          attributeId,
          value,
        },
      }),
      invalidatesTags: (_result, _error, { cvId }) => [
        { type: "CV", id: cvId },
        { type: "CV", id: "LIST" },
      ],
    }),

    getMyCVs: builder.query<CVListItem[], void>({
      query: () => ({
        url: "/cv/me/list",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CV" as const, id })),
              { type: "CV", id: "LIST" },
            ]
          : [{ type: "CV", id: "LIST" }],
    }),

    publishCV: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cv/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "CV", id },
        { type: "CV", id: "LIST" },
      ],
    }),

    likeCV: builder.mutation<void, string>({
      query: (cvId) => ({
        url: `/cv/${cvId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, cvId) => [
        { type: "CV", id: cvId },
        { type: "CV", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCVByIdQuery,
  useCreateCVMutation,
  useUpdateCVAttributeMutation,
  useGetMyCVsQuery,
  usePublishCVMutation,
  useLikeCVMutation,
} = cvApi;
