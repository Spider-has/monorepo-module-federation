import Tool, { HandlerType } from "./Tool/Tool";

export class Brush extends Tool {
  mouseDown: boolean = false;

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
          type: "finish",
        },
      })
    );
  }

  mouseDownHandler(ev: MouseEvent) {
    this.mouseDown = true;
    this.ctx.beginPath();
    const target = ev.target as HTMLElement;
    this.ctx.moveTo(ev.pageX - target.offsetLeft, ev.pageY - target.offsetTop);
  }

  mouseMoveHandler(ev: MouseEvent) {
    if (this.mouseDown) {
      const target = ev.target as HTMLElement;
      // this.draw(ev.pageX - target.offsetLeft, ev.pageY - target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.sessionId,
          figure: {
            type: "brush",
            x: ev.pageX - target.offsetLeft,
            y: ev.pageY - target.offsetTop,
          },
        })
      );
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  listen() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.canvas.onmousedown = this.mouseDownHandler.bind(this) as HandlerType;
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this) as HandlerType;
    this.canvas.onmouseup = this.mouseUpHandler.bind(this) as HandlerType;
  }
}
