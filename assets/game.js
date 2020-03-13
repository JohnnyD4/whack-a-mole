const defaultTimer = 30;
const defaultScore = 0;

let timer = defaultTimer;
let score = defaultScore;
let highScore = window.localStorage.getItem('high-score') || defaultScore;
let counter = 0;
let isStopped = true;
let isActive = false;
let molePosition = null;
let moleCount = null;

/**
 * Initializes game
 * Either to start a brand new game or resumes a stopped game.
 * Hides start button and shows stop button.
 * Sets isStopped to false.
 * Checks if its an active game.
 * If not, add a mole to the game with a position and counter.
 */
const startGame = () => {
  setElementVisibility('start', 'hidden');
  setElementVisibility('stop', 'initial');
  setElementVisibility('reset', 'initial');
  showScores();

  isStopped = false;

  if (!isActive) {
    isActive = true;
    molePosition = setMoleId();
    moleCount = setMoleCount();
    document.getElementById(molePosition).classList.add('mole');
  }
};

/**
 * Starts the timer/countdown for the game.
 * Checks if game is not stopped.
 * If not, decrement the timer by 1.
 * Checks if the timer hit 0.
 * If so, call stop game and set the game to its default state.
 */
const startGameTimer = () => {
  if (!isStopped) {
    timer -= 1;
  }

  if (timer == 0) {
    isActive = false;
    stopGame();

    timer = defaultTimer;
    score = defaultScore;
  }

  document.getElementById('timer').innerHTML = timer;
};

/**
 * Stops/pauses the game.
 * Sets isStopped to true.
 * Checks if its an active game.
 * updates the high score if beaten.
 * Shows start button and hides stop button.
 */
const stopGame = () => {
  isStopped = true;

  if (isActive) {
    document.getElementById('start-text').innerHTML = 'Resume Game';
  } else {
    document.getElementById(molePosition).classList.remove('mole');
    document.getElementById('start-text').innerHTML = 'Start Game';
    setElementVisibility('reset', 'hidden');

    if (score > highScore) {
      highScore = score;
      window.localStorage.setItem('high-score', score);
    }
  }


  setElementVisibility('start', 'initial');
  setElementVisibility('stop', 'hidden');
};

/**
 * Resets the game.
 * Calls stopGame() to hide and show buttons.
 * Removes the mole from the game.
 * Sets the state of the game to its default state.
 */
const resetGame = () => {
  isActive = false;
  stopGame();

  timer = defaultTimer;
  score = defaultScore;
  showScores();
};

/**
 * Checks if the game is in progress.
 * If in progress, check if the id is the moles position.
 * If so, update the score by 1 and call setMolePosition().
 * @param {number} id position of the hole that was clicked
 */
const holeClicked = (id) => {
  if (!isStopped) {
    if (id == molePosition) {
      score += 1;
      setMolePosition();
    }
  }

  showScores();
};

/**
 * Removes the position of the mole.
 * Gives the mole a new position.
 * Checks to make sure it gives a different position than the last.
 * Gives the mole a new random count and resets the counter to 0.
 * Adds the mole to the new position.
 */
const setMolePosition = () => {
  const lastMoleId = molePosition;
  document.getElementById(molePosition).classList.remove('mole');

  do {
    molePosition = setMoleId();
  } while (lastMoleId === molePosition);

  moleCount = setMoleCount();
  counter = 0;
  document.getElementById(molePosition).classList.add('mole');
};

const intervalTimer = setInterval(startGameTimer, 1000);

/**
 * Returns a random number from 0 to 8.
 */
const setMoleId = () => Math.floor(Math.random() * 9);

/**
 * Returns a random number from 1 to 3.
 */
const setMoleCount = () => Math.floor(Math.random() * 3) + 1;

/**
 * Displays the scores on the page.
 */
const showScores = () => {
  document.getElementById('score').innerHTML = score;
  document.getElementById('high-score').innerHTML = highScore;
};

/**
 * Counts for the moles location by seconds.
 * Calls the setMolePosition() function when it hits the time.
 */
const moleTimer = setInterval(() => {
  if (!isStopped) {
    counter += 1;
  }

  if (counter === moleCount) {
    setMolePosition();
  }
}, 1000);

/**
 * Sets the visibility of an element
 * @param {string} id id of the element
 * @param {string} visibilityValue the value to set the visibility to
 */
const setElementVisibility = (id, visibilityValue) => {
  document.getElementById(id).style.visibility = visibilityValue;
};
