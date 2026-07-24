import { createApi } from "@reduxjs/toolkit/query/react";
import type { CreateVacancyDto, VacancyResponse } from "../../../types/vacancy";
import { baseQueryWithReauth } from "../../baseQueryWithReauth";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Vacancies"],
  endpoints: (builder) => ({
    createVacancy: builder.mutation<VacancyResponse, CreateVacancyDto>({
      query: (newVacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: newVacancy,
      }),
      invalidatesTags: [{ type: "Vacancies", id: "LIST" }],
    }),

    getVacancies: builder.query<VacancyResponse[], void>({
      query: () => "/vacancies",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Vacancies" as const, id })),
              { type: "Vacancies", id: "LIST" },
            ]
          : [{ type: "Vacancies", id: "LIST" }],
    }),

    getVacancyById: builder.query<VacancyResponse, string>({
      query: (id) => `/vacancies/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Vacancies", id }],
    }),

    updateVacancyById: builder.mutation<
      void,
      { id: string; vacancy: CreateVacancyDto }
    >({
      query: ({ vacancy, id }) => ({
        url: `/vacancies/${id}`,
        method: "PUT",
        body: vacancy,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Vacancies", id },
        { type: "Vacancies", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateVacancyMutation,
  useGetVacanciesQuery,
  useGetVacancyByIdQuery,
  useUpdateVacancyByIdMutation,
} = vacanciesApi;
