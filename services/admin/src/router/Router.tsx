import { AboutPage, SubmitPage } from "@/pages";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/submit",
    Component: SubmitPage,
  },
];

export const router = createBrowserRouter(routes);

export default routes;
