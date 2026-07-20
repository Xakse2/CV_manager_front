import { createApi } from "@reduxjs/toolkit/query/react";
import type { CreateVacancyDto, VacancyResponse } from "../../../types/vacancy";
import { baseQueryWithReauth } from "../../baseQueryWithReauth";

export const vacanciesApi = createApi({
  reducerPath: "vacanciesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Vacancies"],
  endpoints: (builder) => ({
    createVacancy: builder.mutation<void, CreateVacancyDto>({
      query: (newVacancy) => ({
        url: "/vacancies",
        method: "POST",
        body: newVacancy,
      }),
    }),
    getVacancies: builder.query<VacancyResponse[], void>({
      query: () => "/vacancies",
      providesTags: ["Vacancies"],
    }),
    getVacancyById: builder.query<VacancyResponse, string>({
      query: (id) => `/vacancies/${id}`,
      providesTags: ["Vacancies"],
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
      invalidatesTags: ["Vacancies"],
    }),
  }),
});

export const {
  useCreateVacancyMutation,
  useGetVacanciesQuery,
  useGetVacancyByIdQuery,
  useUpdateVacancyByIdMutation,
} = vacanciesApi;
