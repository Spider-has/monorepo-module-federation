import * as styles from "./App.module.scss";
import { Link, Outlet } from "react-router";

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

const Loading = () => {
  return <div>Loading...</div>;
};

export const App = () => {
  return <PickMe />;
};
