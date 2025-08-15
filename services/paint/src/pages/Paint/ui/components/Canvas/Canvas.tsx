import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import styles from "./Canvas.module.scss";
import CanvasState from "@/pages/Paint/store/CanvasState";
import ToolState from "@/pages/Paint/store/ToolState";
import { Brush } from "@/pages/Paint/tools/Brush";
import { Rect } from "@/pages/Paint/tools/Rect";

interface FigureTypes {
  type: "brush" | "rect" | "finish";
}

interface BrushFigureType extends FigureTypes {
  type: "brush";
  x: number;
  y: number;
}

interface RectFigureType extends FigureTypes {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  strokeColor: string;
}

interface FinishFigureType extends FigureTypes {
  type: "finish";
}

type AllFigureTypes = BrushFigureType | RectFigureType | FinishFigureType;

interface wsConnectionMessage {
  method: "connection" | "draw";
}

interface ConnectionMethodMessage extends wsConnectionMessage {
  method: "connection";
  username: string;
}

interface DrawMethodMessage extends wsConnectionMessage {
  method: "draw";
  figure: AllFigureTypes;
}

type AllWSMehtods = ConnectionMethodMessage | DrawMethodMessage;

type imgResponse = {
  data: string;
};

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [username, setUsername] = useState<string>("");
  const [showModal, setModal] = useState<boolean>(true);

  const params = useParams();

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current);
    fetch(`http://localhost:5000/image?id=${params.id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const response = res as imgResponse;
        if (response.data !== undefined) {
          const ctx = canvasRef.current.getContext("2d");
          const img = new Image();
          img.src = response.data;
          img.onload = () => {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            ctx.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          };
        }
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  const mouseDownHandler = () => {
    CanvasState.pushToUndo(canvasRef.current.toDataURL());
    fetch(`http://localhost:5000/image?id=${params.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: canvasRef.current.toDataURL(),
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const connectionHandler = () => {
    CanvasState.setUserName(username);
    setModal(false);
  };

  const drawHandler = (msg: DrawMethodMessage) => {
    const { figure } = msg;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "finish":
        ctx.beginPath();
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.fillColor,
          figure.strokeColor
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (CanvasState.username) {
      const socket = new WebSocket("ws://localhost:5000");
      CanvasState.setWebSocket(socket);
      CanvasState.setSession(params.id);
      ToolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username,
            method: "connection",
          })
        );
      };
      socket.onmessage = (event) => {
        const message = JSON.parse(String(event.data)) as AllWSMehtods;
        switch (message.method) {
          case "connection":
            console.log(`пользователь ${message.username} присоединился`);
            break;
          case "draw":
            drawHandler(message);
            break;
          default:
            break;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, username, CanvasState.username]);

  return (
    <div className={styles.canvas}>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Введите ваше имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={connectionHandler}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        width={600}
        height={600}
      />
    </div>
  );
});
