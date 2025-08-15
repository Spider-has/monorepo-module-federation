import Tool, { HandlerType } from "./Tool/Tool";

export class Rect extends Tool {
  mouseDown: boolean = false;

  startX: number;

  startY: number;

  saved: string;

  width: number;

  height: number;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          fillColor: this.ctx.fillStyle,
          strokeColor: this.ctx.strokeStyle,
        },
      })
    );
  }

  mouseDownHandler(ev: MouseEvent) {
    this.mouseDown = true;
    const target = ev.target as HTMLElement;
    this.startX = ev.pageX - target.offsetLeft;
    this.startY = ev.pageY - target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(ev: MouseEvent) {
    if (this.mouseDown) {
      const target = ev.target as HTMLElement;
      const currentX = ev.pageX - target.offsetLeft;
      const currentY = ev.pageY - target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    fillColor: string,
    strokeColor: string
  ) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this) as HandlerType;
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this) as HandlerType;
    this.canvas.onmouseup = this.mouseUpHandler.bind(this) as HandlerType;
  }
}
