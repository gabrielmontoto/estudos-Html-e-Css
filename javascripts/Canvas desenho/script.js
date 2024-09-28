let currentColor = "black";
let screen = docQuerySelector("#tela");
let ctx = screen.getContext("2d");
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

document.querySelectorAll(".colorArea .color").forEach((element) => {
  element.addEventListener("click", colorClickEvent);
});
screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMovementEvent);
screen.addEventListener("mouseup", mouseUpEvent);
docQuerySelector(".clear").addEventListener("click", clear);

function colorClickEvent(event) {
  let color = event.target.getAttribute("data-color");
  currentColor = color;

  docQuerySelector(".color.active").classList.remove("active");
  event.target.classList.add("active");
}
function docQuerySelector(query) {
  return document.querySelector(query);
}

function mouseDownEvent(event) {
  canDraw = true;
  mouseX = event.pageX - screen.offsetLeft;
  mouseY = event.pageY - screen.offsetTop;
}
function mouseMovementEvent(event) {
  if (!canDraw) return;
  draw(event.pageX, event.pageY);
}
function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineJoin = "round";
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function mouseUpEvent() {
  canDraw = false;
}

function clear() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
