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

      invalidatesTags: ["CV"],
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
      ],
    }),
    getMyCVs: builder.query<CVListItem[], void>({
      query: () => ({
        url: "/cv/me/list",
      }),
      providesTags: ["CV"],
    }),
  }),
});

export const {
  useGetCVByIdQuery,
  useCreateCVMutation,
  useUpdateCVAttributeMutation,
  useGetMyCVsQuery,
} = cvApi;
