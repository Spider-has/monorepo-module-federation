import { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme } from "@mui/material";
import "./App.scss";
import { Outlet, RouterProvider } from "react-router-dom";
import { Context } from "./firebase/Context";
import { auth, firestore } from "./firebase/init";
import { LoaderPage } from "@/pages";
import { router } from "@/router/Router";

export function AppWrapper(props: { children: React.ReactNode }) {
  const val = useMemo(() => ({ auth, firestore }), []);
  const [, loading] = useAuthState(auth);
  if (loading) return <LoaderPage />;
  const { children } = props;
  return (
    <ThemeProvider theme={createTheme()}>
      <Context.Provider value={val}>{children}</Context.Provider>
    </ThemeProvider>
  );
}

export function RouterProviderWrapper() {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
}

export function RootApp() {
  return <RouterProvider router={router} />;
}
