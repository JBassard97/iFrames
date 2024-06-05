const ball = document.querySelector(".ball");
const main = document.querySelector("main");
const quad1 = document.querySelector(".quad1");
const quad2 = document.querySelector(".quad2");
const quad3 = document.querySelector(".quad3");
const quad4 = document.querySelector(".quad4");
let mainWidth = main.clientWidth;
let mainHeight = main.clientHeight;
let ballDiameter = ball.offsetWidth;
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

ball.addEventListener("mousedown", dragStart);
ball.addEventListener("mouseup", dragEnd);

window.addEventListener("resize", function () {
  mainWidth = main.clientWidth;
  mainHeight = main.clientHeight;
  positionBall();
});

function positionBall() {
  ball.style.left = `${mainWidth / 2 - ballDiameter / 2}px`;
  ball.style.top = `${mainHeight / 2 - ballDiameter / 2}px`;
}

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === ball) {
    isDragging = true;
  }

  document.addEventListener("mousemove", drag);
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;

  document.removeEventListener("mousemove", drag);
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, ball);
    updateQuadrantWidths();
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function updateQuadrantWidths() {
  const ballRect = ball.getBoundingClientRect();
  const ballX = ballRect.left + ballDiameter / 2;

  quad1.style.width = `${ballX}px`;
  quad3.style.width = `${ballX}px`;
}

positionBall();
