import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RouterProvider } from "react-router";
import { router } from "@/router/Router";
import "./App.scss";
import { Context } from "./firebase/Context";
import { auth, firestore } from "./firebase/init";
import { LoaderPage } from "@/pages";

export function App() {
  const val = useMemo(() => ({ auth, firestore }), []);
  const [, loading] = useAuthState(auth);
  if (loading) return <LoaderPage />;
  return (
    <Context.Provider value={val}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}
