"use strict";

//************************************************/
//************   Selecting Elements   ************/
//************************************************/

const players = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];
const scoreEl = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];

const currentScoreEl = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];

const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");

//************************************************/
//**********   Initializing variables   **********/
//************************************************/
let activePlayer = 0;
let currentScore = [0, 0];
let dice = 0;
scoreEl[0].textContent = "0";
scoreEl[1].textContent = "0";
diceEl.classList.add("hidden");

//******************************************/
//**********   Event Listeners   ***********/
//******************************************/
btnRollEl.addEventListener("click", function () {
  // 1. Generate a random number between 1-6
  dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display Dice img
  diceEl.classList.remove("hidden");
  diceEl.src = `/img/dice-${dice}.png`;

  // 3. Roll die, tally score until 1 is rolled -> at which point switch players
  if (activePlayer === 0) {
    playerTurn(0);
  } else {
    playerTurn(1);
  }
});

btnNewEl.addEventListener("click", function () {
  //Reset Game
  resetGame();
});

btnHoldEl.addEventListener("click", function () {
  if (activePlayer === 0) {
    hold(0);
  } else {
    hold(1);
  }
});

/*************************************************/
/*****************   Functions   *****************/
/*************************************************/

function playerTurn(player) {
  if (dice === 1) {
    toggleActivePlayer();
    currentScore[player] = 0;
  } else {
    currentScore[player] += dice;
  }
  currentScoreEl[player].textContent = currentScore[player];
  console.log(
    `Player ${player + 1} rolled a ${dice} and has current score is ${
      currentScore[player]
    }`
  );
}

function toggleActivePlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0; // Switches player
  players[0].classList.toggle("player--active");
  players[1].classList.toggle("player--active");
}

function hold(player) {
  // Calculate currentScore + scoreboard score
  currentScore[player] =
    currentScore[player] + Number(scoreEl[player].textContent);

  // update scoreboard with new score
  scoreEl[player].textContent = `${currentScore[player]}`;

  //reset current score to 0
  currentScoreEl[player].textContent = 0;
  currentScore[player] = 0;

  //Check for a winner
  if (Number(scoreEl[player].textContent) >= 10) {
    alert(
      `Player ${player + 1} wins the game with a score of ${
        scoreEl[player].textContent
      }!!!  Click Okay to play again!`
    );
    resetGame();
  }

  // Switches player
  toggleActivePlayer();
}

function resetGame() {
  diceEl.classList.add("hidden");
  activePlayer = 0;
  players[0].classList.add("player--active");
  players[1].classList.remove("player--active");

  for (let i = 0; i < scoreEl.length; i++) {
    currentScore[i] = 0;
    scoreEl[i].textContent = 0;
    currentScoreEl[i].textContent = currentScore[i];
  }
}
