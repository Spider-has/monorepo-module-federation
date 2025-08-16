import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ShopPage, ShopPage2 } from "@/pages";

const routes: RouteObject[] = [
  {
    path: "/shop",
    Component: ShopPage,
    children: [
      {
        path: "/shop/first",
        Component: ShopPage,
      },
      {
        path: "/shop/second",
        Component: ShopPage2,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
