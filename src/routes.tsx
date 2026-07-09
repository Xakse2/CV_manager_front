import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/homePage";
import { AttributesPage } from "./pages/attribute/AttributesPage";
import { VacanciesPage } from "./pages/vacancies/vacanciesPage";
import { CreateVacancyPage } from "./pages/createVacancy/createVacancyPage";

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
]);
