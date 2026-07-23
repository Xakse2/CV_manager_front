import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQueryWithReauth";

import type { Project } from "../../../types/project";

export const projectApi = createApi({
  reducerPath: "projectApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["Project"],

  endpoints: (builder) => ({
    getMyProjects: builder.query<Project[], void>({
      query: () => ({
        url: "/me/projects",
      }),

      providesTags: ["Project"],
    }),

    createProject: builder.mutation<Project, Partial<Project>>({
      query: (body) => ({
        url: "/me/projects",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation<
      Project,
      { id: string; body: Partial<Project> }
    >({
      query: ({ id, body }) => ({
        url: `/me/projects/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/me/projects/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetMyProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
