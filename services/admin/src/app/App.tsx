import * as styles from "./App.module.scss";
import { BrowserRouter, Link, Outlet, RouterProvider } from "react-router";
import { router } from "@/router/Router";

const Platform = () => {
  console.log("env: ", __ENV__);
  if (__PLATFORM__ == "desktop") return <div>desktop</div>;
  if (__PLATFORM__ == "mobile") return <div>mobile</div>;
};

const PickMe = () => {
  return (
    <>
      <Platform />

      <div data-testId={"App.DataTestId"} className={styles.main}>
        <Link to={"about"}>about</Link>
        <Link to={"shop"}>shop</Link>
        <Link to={"submit"}>submit</Link>
      </div>
      <Outlet />
    </>
  );
};

export const Loading = () => {
  return <div>Loading...</div>;
};

export const App = () => {
  return <RouterProvider router={router} />;
};
