//infos iniciais
let board = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};
let currentTurn = "";
let warning = "";
let isRunning = false;

reset();
//events
docQuerySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});
//functions
function checkGame() {
  if (checkWinner("x")) {
    warning = "o player X venceu";
    isRunning = false;
    return;
  }
  if (checkWinner("o")) {
    warning = "o player O venceu";
    isRunning = false;
    return;
  }
  if (isFull()) {
    warning = "Empate";
    isRunning = false;
    return;
  }
}
function checkWinner(player) {
  let winPossibility = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",
    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",
    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (const key in winPossibility) {
    let pArray = winPossibility[key].split(",");
    let currentPlayerWin = pArray.every((option) => {
      return board[option] === player ? true : false;
    });
    if (currentPlayerWin) return true;
  }
  return false;
}
function isFull() {
  for (const key in board) {
    if (board[key] === "") return false;
  }
  return true;
}

function togglePlayer() {
  currentTurn = currentTurn === "x" ? "o" : "x";
  renderInfo();
}

function itemClick(event) {
  if (!isRunning) return;
  let clickedItem = event.target.getAttribute("data-item");

  if (board[clickedItem] === "") {
    board[clickedItem] = currentTurn;
    renderBoard();
    togglePlayer();
  }
}

function reset() {
  warning = "";

  let random = Math.floor(Math.random() * 2);
  currentTurn = random === 0 ? "x" : "o";

  for (const key in board) {
    board[key] = "";
  }
  isRunning = true;

  renderBoard();
  renderInfo();
}

function renderBoard() {
  for (const key in board) {
    let currentItem = docQuerySelector(`div[data-item=${key}]`);

    currentItem.innerHTML = board[key];
  }

  checkGame();
}
function renderInfo() {
  docQuerySelector(".vez").innerHTML = currentTurn;
  docQuerySelector(".resultado").innerHTML = warning;
}

//extra
function docQuerySelector(query) {
  return document.querySelector(query);
}
