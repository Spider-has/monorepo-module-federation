import { Link, Outlet } from "react-router";
import styles from "./App.module.scss";

function Platform() {
  if (__PLATFORM__ === "desktop") return <div>desktop</div>;
  if (__PLATFORM__ === "mobile") return <div>mobile</div>;
}

function PickMe() {
  return (
    <>
      <Platform />

      <div data-testId="App.DataTestId" className={styles.main}>
        <Link to="about">about</Link>
        <Link to="shop">shop</Link>
        <Link to="submit">submit</Link>
        <Link to="real-time-chat">chat</Link>
      </div>
      <Outlet />
    </>
  );
}

export function App() {
  return <PickMe />;
}
