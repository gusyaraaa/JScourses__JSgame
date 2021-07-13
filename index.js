const $start = document.querySelector("#start");
const $game = document.querySelector("#game");
const $time = document.querySelector("#time");
const $timeHeader = document.querySelector("#time-header");
const $resultHeader = document.querySelector("#result-header");
const $result = document.querySelector("#result");
const $gameTime = document.querySelector("#game-time");

const boxColors = [
  "#CB356B",
  "#BD3F32",
  "#3A1C71",
  "#D76D77",
  "#283c86",
  "#45a247",
  "#8e44ad",
  "#155799",
  "#159957",
  "#000046",
  "#1CB5E0",
  "#2F80ED",
];
let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);

$game.addEventListener("click", (event) => {
  if (event.target.dataset.box && isGameStarted) {
    score += 1;

    renderBox();
  }
});

$gameTime.addEventListener("input", setGameTime);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
  score = 0;
  setGameTime();

  $gameTime.setAttribute("disabled", "true");
  $start.classList.add("hidden");
  $game.style.backgroundColor = "#fff";

  isGameStarted = true;

  const interval = setInterval(() => {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function renderBox() {
  $game.innerHTML = "";
  const box = document.createElement("div");

  const boxSize = getRandom(30, 100);
  const gameSize = $game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = boxColors[getRandom(0, boxColors.length)];
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

function endGame() {
  isGameStarted = false;
  setGameScore();

  $gameTime.removeAttribute("disabled");
  $start.classList.remove("hidden");
  $game.innerHTML = "";
  $game.style.backgroundColor = "#ccc";
  $timeHeader.classList.add("hidden");
  $resultHeader.classList.remove("hidden");
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  const time = +$gameTime.value;
  $time.textContent = time.toFixed(1);

  $timeHeader.classList.remove("hidden");
  $resultHeader.classList.add("hidden");
}
