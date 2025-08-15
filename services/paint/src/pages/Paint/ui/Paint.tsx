import { Canvas } from "./components/Canvas/Canvas";
import { SettingsBar } from "./components/SettingsBar/SettingsBar";
import { Toolbar } from "./components/Tollbar/Toolbar";
import styles from "./Paint.module.scss";

function PaintPage() {
  return (
    <div className={styles.paintPage}>
      <Toolbar />
      <SettingsBar />
      <Canvas />
    </div>
  );
}

export default PaintPage;
