import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement = null;

  undoList: string[] = [];

  redoList: string[] = [];

  username: string = "";

  sessionId: string = "";

  socket: WebSocket = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSession(id: string) {
    this.sessionId = id;
  }

  setWebSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setUserName(name: string) {
    this.username = name;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(action: string) {
    this.undoList.push(action);
  }

  pushToRedo(action: string) {
    this.redoList.push(action);
  }

  undo() {
    const ctx = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }

  redo() {
    const ctx = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
