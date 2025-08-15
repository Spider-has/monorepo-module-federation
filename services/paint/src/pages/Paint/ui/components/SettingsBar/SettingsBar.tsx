import ToolState from "@/pages/Paint/store/ToolState";
import styles from "./SettingsBar.module.scss";

export function SettingsBar() {
  return (
    <div className={styles.settingsbar}>
      <p>settings</p>
      <label htmlFor="line-width">
        Толщина линии
        <input
          onChange={(e) => ToolState.setLineWidth(Number(e.target.value))}
          id="line-width"
          type="number"
          min={1}
          max={50}
        />
      </label>
      <label htmlFor="stroke-color">
        Цвет контура
        <input
          onChange={(e) => ToolState.setStrokeColor(e.target.value)}
          id="stroke-color"
          type="color"
        />
      </label>
    </div>
  );
}
