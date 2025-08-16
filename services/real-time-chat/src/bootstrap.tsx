import { createRoot } from "react-dom/client";
import "@emotion/react";
import { RootApp } from "./app/App";

const root = document.getElementById("root");

if (!root) throw new Error("root elem not found");

createRoot(root).render(<RootApp />);
