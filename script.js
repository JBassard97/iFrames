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

// Begin resizing logic

ball.addEventListener("mousedown", dragStart);
ball.addEventListener("mouseup", dragEnd);

window.addEventListener("resize", function () {
  mainWidth = main.clientWidth;
  mainHeight = main.clientHeight;
  positionBall();
  updateQuadrantWidths();
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
  const ballY = ballRect.top + ballDiameter / 2;

  quad1.style.width = `${ballX + 1}px`;
  quad2.style.width = `${mainWidth - ballX}px`;

  quad3.style.width = `${ballX + 1}px`;
  quad4.style.width = `${mainWidth - ballX}px`;

  quad1.style.height = `${ballY - ballDiameter + 3}px`;
  quad2.style.height = `${ballY - ballDiameter + 3}px`;
  quad3.style.height = `${mainHeight - ballY + ballDiameter - 3}px`;
  quad4.style.height = `${mainHeight - ballY + ballDiameter - 3}px`;
}

positionBall();

// End resizing logic

// Begin selecting iframe site logic

const quad1Select = document.querySelector(".quad1-select");
const quad2Select = document.querySelector(".quad2-select");
const quad3Select = document.querySelector(".quad3-select");
const quad4Select = document.querySelector(".quad4-select");
const allSelects = [quad1Select, quad2Select, quad3Select, quad4Select];

for (const select of allSelects) {
  let blankOption = document.createElement("option");
  blankOption.textContent = "Set Site";
  select.appendChild(blankOption);
  for (const site of iFrammableSites) {
    let option = document.createElement("option");
    option.textContent = site.name;
    option.value = site.url;
    select.appendChild(option);
  }

  select.addEventListener("change", function () {
    if (this.value !== "Set Site") {
      const iframe = document.createElement("iframe");
      iframe.src = this.value;

      this.parentElement.appendChild(iframe);
      this.style.display = "none";
    }
  });
}

// End selecting iframe site logic

// Begin reset button logic

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", function () {
  window.location.reload();
});

// End reset button logic

// Begin color picking logic
const allQuads = [quad1, quad2, quad3, quad4];
const colorInput = document.querySelector(".color-input");

const savedColor = localStorage.getItem("selectedColor");
if (savedColor) {
  for (const quad of allQuads) {
    quad.style.backgroundColor = savedColor;
  }
  colorInput.value = savedColor;
}

colorInput.addEventListener("input", (event) => {
  const selectedColor = event.target.value;
  for (const quad of allQuads) {
    quad.style.backgroundColor = selectedColor;
  }
  localStorage.setItem("selectedColor", selectedColor);
});

// End color picking logic
