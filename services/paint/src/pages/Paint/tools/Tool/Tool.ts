export default class Tool {
  canvas: HTMLCanvasElement = null;

  ctx: CanvasRenderingContext2D = null;

  socket: WebSocket = null;

  sessionId: string = "";

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.sessionId = sessionId;
    this.ctx = canvas.getContext("2d");
    this.ctx.strokeStyle = "white";
    this.ctx.fillStyle = "white";
    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(width: number) {
    this.ctx.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }
}

export type HandlerType = () => unknown;
