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
import { CvPage } from "./pages/cv/сvPage";
import { ProtectedRoute } from "./routes/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "registration",
        element: <RegistrationPage />,
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute roles={["CANDIDATE", "RECRUITER", "ADMIN"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      {
        path: "cv/:id",
        element: (
          <ProtectedRoute roles={["CANDIDATE"]}>
            <CvPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "vacancies",
        element: (
          <ProtectedRoute roles={["RECRUITER", "CANDIDATE"]}>
            <VacanciesPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "vacancies/create",
        element: (
          <ProtectedRoute roles={["RECRUITER"]}>
            <CreateVacancyPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "vacancies/:id",
        element: (
          <ProtectedRoute roles={["RECRUITER", "CANDIDATE"]}>
            <VacancyDetailsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "vacancies/:id/edit",
        element: (
          <ProtectedRoute roles={["RECRUITER"]}>
            <VacancyEditPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "attributes",
        element: (
          <ProtectedRoute roles={["ADMIN", "RECRUITER"]}>
            <AttributesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
