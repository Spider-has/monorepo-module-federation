import { PaintButton } from "@/shared";
import styles from "./Toolbar.module.scss";
import ToolState from "@/pages/Paint/store/ToolState";
import CanvasState from "@/pages/Paint/store/CanvasState";
import { Brush } from "@/pages/Paint/tools/Brush";
import { Rect } from "@/pages/Paint/tools/Rect";

export function Toolbar() {
  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ToolState.setStrokeColor(e.target.value);
    ToolState.setFillColor(e.target.value);
  };
  const download = () => {
    const dataUrl = CanvasState.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${CanvasState.sessionId}.jpg`;
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className={styles.toolbar}>
      <PaintButton
        onClick={() => {
          ToolState.setTool(
            new Brush(
              CanvasState.canvas,
              CanvasState.socket,
              CanvasState.sessionId
            )
          );
        }}
        content="рисовать"
      />
      <PaintButton
        onClick={() => {
          ToolState.setTool(
            new Rect(
              CanvasState.canvas,
              CanvasState.socket,
              CanvasState.sessionId
            )
          );
        }}
        content="прямоугольник"
      />
      <input type="color" onChange={onColorChange} />
      <PaintButton
        onClick={() => {
          CanvasState.undo();
        }}
        content="назад"
      />
      <PaintButton
        onClick={() => {
          CanvasState.redo();
        }}
        content="вперед"
      />
      <PaintButton onClick={download} content="скачать" />
    </div>
  );
}
