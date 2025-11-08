import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthNavbar from "./components/AuthNavbar.tsx";
import MainNavbar from "./components/MainNavbar.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthNavbar choose="sign_in" />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <MainNavbar />
      </ProtectedRoute>
    ),
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
