import { BrowserRouter, Link, Outlet, RouterProvider } from "react-router";
import * as styles from "./App.module.scss";
import { router } from "@/router/Router";

function Platform() {
  if (__PLATFORM__ == "desktop") return <div>desktop</div>;
  if (__PLATFORM__ == "mobile") return <div>mobile</div>;
}

function PickMe() {
  return (
    <>
      <Platform />

      <div data-testId="App.DataTestId" className={styles.main}>
        <Link to="about">about</Link>
        <Link to="shop">shop</Link>
        <Link to="submit">submit</Link>
      </div>
      <Outlet />
    </>
  );
}

export function Loading() {
  return <div>Loading...</div>;
}

export function App() {
  return <RouterProvider router={router} />;
}
