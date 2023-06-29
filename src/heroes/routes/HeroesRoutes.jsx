import { Navigate } from "react-router-dom";
import { ErrorPage } from "../../ui";
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages";

export const HeroesRoutes = [
  {
    path: "/marvel",
    element: <MarvelPage />,
  },
  {
    path: "/dc",
    element: <DcPage />,
  },
  {
    path: "/",
    element: <Navigate to={"/marvel"} />,
  },
  {
    path: "/search",
    element: <SearchPage to={"/marvel"} />,
  },
  {
    path: "/hero/:id",
    element: <HeroPage to={"/marvel"} />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
];
