import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LogedRouter } from "./LogedRouter";
import { LoginPage } from "../auth/pages";
import { HeroesRoutes } from "../heroes/routes/HeroesRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    element: (
      <PrivateRoute>
        <LogedRouter />
      </PrivateRoute>
    ),
    children: HeroesRoutes,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
