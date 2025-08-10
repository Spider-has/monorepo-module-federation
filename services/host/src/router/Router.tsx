import { App } from "@/app/App";
import { createBrowserRouter } from "react-router-dom";

//@ts-ignore
import { default as shopRoutes } from "shop/Router";
//@ts-ignore
import { default as adminRoutes } from "admin/Router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [...shopRoutes, ...adminRoutes],
  },
]);

export default router;
