import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/homePage";
import { AttributesPage } from "./pages/attribute/AttributesPage";
import { VacanciesPage } from "./pages/vacancies/vacanciesPage";
import { CreateVacancyPage } from "./pages/createVacancy/createVacancyPage";
import { VacancyDetailsPage } from "./pages/vacancies/VacancyDetailsPage";
import { VacancyEditPage } from "./pages/vacancies/vacancyEditPage";
import { Layout } from "./components/layout/layout";
import { LoginPage } from "./pages/logIn/login";
import { RegistrationPage } from "./pages/registration/registerPage";
import { ProfilePage } from "./pages/profile/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
