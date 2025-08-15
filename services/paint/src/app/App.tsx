import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import "./App.scss";

export function App() {
  return <RouterProvider router={router} />;
}
