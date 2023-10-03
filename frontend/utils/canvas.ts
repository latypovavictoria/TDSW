import { store } from "../redux/store";

const strokeOnCanvas = () => {
  const strokes = store.getState().canvas.strokes;
  const canvas = document.getElementById("dw-canvas") as HTMLCanvasElement;

  const nextElement = document
    .getElementById("__next")
    ?.getBoundingClientRect();

  if (!nextElement || !canvas) return;

  canvas.width = nextElement.width;
  canvas.height = nextElement.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const stroke of strokes) {
    const scrollx = window.scrollX;
    const scrolly = window.scrollY;

    const x = stroke.start.x;
    const y = stroke.start.y;
    const x1 = stroke.end.x + scrollx;
    const y1 = stroke.end.y + scrolly;

    const distance = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
    const diff = {
      x: x1 - x,
      y: y1 - y,
    };

    const p1 = {
      y: y,
      x: x + Math.min((4 * diff.x) / 10, distance / 5),
    };

    const p2 = {
      y: y1,
      x: x1 - Math.min((4 * diff.x) / 10, distance / 5),
    };

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = "#4dffff";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};

export default strokeOnCanvas;
