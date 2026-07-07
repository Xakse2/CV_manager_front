import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/homePage";
import { AttributesPage } from "./pages/attribute/AttributesPage";

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
]);
