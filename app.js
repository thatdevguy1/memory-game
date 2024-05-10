//cached elements
const startBtn = document.querySelector("button");
const timerEl = document.querySelector(".timer > h4");
const mainEl = document.querySelector("main");
const cardEls = mainEl.children;
const msgEl = document.querySelector("span");

//state
let timerInterval;
let timer = 0;
const selectedCards = [];
let matches = 0;
const gameBoard = [
  "red",
  "blue",
  "orange",
  "purple",
  "pink",
  "green",
  "red",
  "blue",
  "orange",
  "purple",
  "pink",
  "green",
];

//event listeners
startBtn.addEventListener("click", function (e) {
  //start function
  init();
});

//function
function init() {
  timer = 0;
  mainEl.addEventListener("click", handleBoardClick);
  shuffleArray(gameBoard);
  matches = 0;
  msgEl.textContent = "";
  setCardColors();
  setTimeout(blackout, 2000);
}

function handleBoardClick(e) {
  //card select function
  if (!e.target.classList.contains("card")) {
    return;
  }

  if (selectedCards.includes(e.target)) {
    msgEl.textContent = "Please select another card";
    return;
  }

  selectedCards.push(e.target);
  revealCard(e.target);
  compareSelection();
}

function compareSelection() {
  if (selectedCards.length !== 2) {
    return;
  }
  msgEl.textContent = "";
  if (
    selectedCards[0].getAttribute("data-color") ===
    selectedCards[1].getAttribute("data-color")
  ) {
    matches++;
    isWinner();
    selectedCards.length = 0;
  } else {
    mainEl.removeEventListener("click", handleBoardClick);
    setTimeout(function () {
      selectedCards.forEach((card) => (card.style.backgroundColor = "black"));
      selectedCards.length = 0;
      mainEl.addEventListener("click", handleBoardClick);
    }, 700);
  }
}

function revealCard(card) {
  card.style.backgroundColor = card.getAttribute("data-color");
}

//From stackoverflow
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function blackout() {
  const cards = Array.from(cardEls);
  cards.forEach((card) => (card.style.backgroundColor = "black"));
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
    if (timer >= 15) {
      mainEl.removeEventListener("click", handleBoardClick);
      msgEl.textContent = "You lose";
      clearInterval(timerInterval);
    }
  }, 1000);
}

function setCardColors() {
  gameBoard.forEach((color, idx) => {
    cardEls[idx].style.backgroundColor = color;
    cardEls[idx].setAttribute("data-color", color);
  });
}

function isWinner() {
  if (matches === 6) {
    msgEl.textContent = "You win";
    clearInterval(timerInterval);
    mainEl.removeEventListener("click", handleBoardClick);
  }
}
