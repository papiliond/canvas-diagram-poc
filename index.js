var WIDTH = 1600,
  HEIGHT = 800,
  SQUARE = 10,
  RATIO = 1;

var canvas = d3.select("#root").append("canvas").attr("width", WIDTH).attr("height", HEIGHT).attr("style", "border: 3px solid black;");
var ctx = canvas.node().getContext("2d");

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

drawGridlines(ctx);

const obj1Ratio = 200 / 272;
const obj1 = new CanvasObject("obj1.png", 100, 200, 100, 100 / obj1Ratio, obj1Ratio).draw();

const obj2Ratio = 180 / 306;
const obj2 = new CanvasObject("obj2.png", 400, 100, 100, 100 / obj2Ratio, obj2Ratio).draw();

const obj3Ratio = 180 / 306;
const obj3 = new CanvasObject("obj2.png", 600, 300, 100, 100 / obj2Ratio, obj2Ratio).draw();

obj1.connectObject("right1", obj2, "left1", "blue");
obj1.connectObject("right2", obj3, "left2", "red");
obj3.connectObject("left1", obj2, "right2", "green");

console.log({ obj1, obj2, obj3 });

/* FUNCTIONS */

function drawGridlines() {
  for (var x = 0; x <= WIDTH; x += SQUARE) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
  }

  for (var x = 0; x <= HEIGHT; x += SQUARE) {
    ctx.moveTo(0, x);
    ctx.lineTo(WIDTH, 0 + x);
  }

  ctx.strokeStyle = "#eee";
  ctx.stroke();
}
