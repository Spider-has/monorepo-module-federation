import { createRoot } from "react-dom/client";
import { router } from "./router/Router";
import { RouterProvider } from "react-router-dom";

const root = document.getElementById("root");

if (!root) throw new Error("root elem not found");

createRoot(root).render(<RouterProvider router={router} />);
