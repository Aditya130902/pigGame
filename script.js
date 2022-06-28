'use strict';

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let scores = [0, 0];
let player = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${player}`).textContent = currentScore;
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');

  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${player}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[player] += currentScore;
    document.getElementById(`score--${player}`).textContent = scores[player];
    if (scores[player] >= 40) {
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  player = 0;
  if (!diceEl.classList.contains('hidden')) diceEl.classList.add('hidden');
  if (player1El.classList.contains('player--winner'))
    player1El.classList.remove('player--winner');
  if (player0El.classList.contains('player--winner'))
    player0El.classList.remove('player--winner');
  if (player1El.classList.contains('player--active'))
    player1El.classList.remove('player--active');
  if (!player0El.classList.contains('player--active'))
    player0El.classList.add('player--active');
});
