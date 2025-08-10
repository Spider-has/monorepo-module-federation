import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import React from "react";

const root = document.getElementById("root");

if (!root) throw new Error("root elem not found");

createRoot(root).render(<App />);
