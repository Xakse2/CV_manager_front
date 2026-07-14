import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/homePage";
import { AttributesPage } from "./pages/attribute/AttributesPage";
import { VacanciesPage } from "./pages/vacancies/vacanciesPage";
import { CreateVacancyPage } from "./pages/createVacancy/createVacancyPage";
import { VacancyDetailsPage } from "./pages/vacancies/VacancyDetailsPage";
import { VacancyEditPage } from "./pages/vacancies/vacancyEditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/attributes",
    element: <AttributesPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/vacancies",
    element: <VacanciesPage />,
  },
  {
    path: "/vacancies/create",
    element: <CreateVacancyPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/vacancies/:id",
    element: <VacancyDetailsPage />,
  },
  {
    path: "/vacancies/:id/edit",
    element: <VacancyEditPage />,
  },
]);
