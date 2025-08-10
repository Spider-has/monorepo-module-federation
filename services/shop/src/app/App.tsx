import { RouterProvider } from "react-router";
import { router } from "@/router/Router";

export const Loading = () => {
  return <div>Loading...</div>;
};

export const App = () => {
  return <RouterProvider router={router} />;
};
