/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-named-default */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createBrowserRouter } from "react-router-dom";

// import { default as shopRoutes } from "shop/Router";
// import { default as adminRoutes } from "admin/Router";
import { default as realTimeChatRoutes } from "realTimeChat/Router";
import { App } from "@/app/App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [...realTimeChatRoutes],
  },
]);

console.log(router);

export default router;
