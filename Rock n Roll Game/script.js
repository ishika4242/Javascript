"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRules = document.querySelector(".btn--rules");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--avtive");
};

init();

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  }

  switchPlayer();
});

btnNew.addEventListener("click", function () {
  init();
});

const openModal = function () {
  console.log("click");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  //console.log(e);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
