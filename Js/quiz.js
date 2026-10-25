// All numbers of the game are here. Change them and the game still works.
const START_LIVES = 3;       
const START_HINTS = 1;       // thid for 50/50 hint
const WRONG_TO_REMOVE = 2;   // how many wrong answers 50/50 removes

// Each question: 4 options, correct is storing the index of correct answer
const QUESTIONS = [
  {
    text: "Which Yemeni port gave its name to a coffee flavor?",
    options: ["Aden", "Mocha", "Hodeidah", "Mukalla"],
    correct: 1
  },
  {
    text: "Which island is home to the umbrella-shaped dragon's blood tree?",
    options: ["Kamaran", "Zanzibar", "Socotra", "Crete"],
    correct: 2
  },
  {
    text: "Aden, Yemen's port city, is built inside what?",
    options: ["An extinct volcano crater", "A desert canyon", "A coral reef", "A salt lake"],
    correct: 0
  },
  {
    text: "Which Yemeni city is nicknamed the \"Manhattan of the Desert\" for its tall mud-brick towers?",
    options: ["Taiz", "Ibb", "Zabid", "Shibam"],
    correct: 3
  },
  {
    text: "Which narrow strait separates Yemen from Africa?",
    options: ["Strait of Hormuz", "Bab-el-Mandeb", "Strait of Gibraltar", "Bosphorus"],
    correct: 1
  },
  {
    text: "Which country is Yemen's northern neighbor?",
    options: ["Saudi Arabia", "Iraq", "Jordan", "Egypt"],
    correct: 0
  }
];

// biringing page elements from html doc
const gameBox = document.getElementById("quiz-game");
const resultBox = document.getElementById("quiz-result");
const progressEl = document.getElementById("quiz-progress");
const livesEl = document.getElementById("quiz-lives");
const scoreEl = document.getElementById("quiz-score");
const questionEl = document.getElementById("quiz-question");
const optionsBox = document.getElementById("quiz-options");
const feedbackEl = document.getElementById("quiz-feedback");
const hintBtn = document.getElementById("quiz-hint");
const nextBtn = document.getElementById("quiz-next");
const restartBtn = document.getElementById("quiz-restart");
const resultTitle = document.getElementById("quiz-result-title");
const resultText = document.getElementById("quiz-result-text");

// ===================== GAME STATE =====================
let state;

function newState() {
  return {
    index: 0,            // current question number
    lives: START_LIVES,
    score: 0,
    hints: START_HINTS,  // 50/50 uses left
    answered: false,     // did the player already answer this question?
    chosen: null,        // index of the option the player clicked
    removed: [],         // options removed by 50/50 on this question
    over: false,         // is the game finished?
    won: false,
    message: "",
    messageType: ""      // "success", "error" or "info"
  };
}

// Random whole number from min to max (both included)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function say(text, type) {
  state.message = text;
  state.messageType = type;
}

// ===================== RENDER =====================
// Shows the current state on the page. Called after every move.
function render() {
  gameBox.classList.toggle("d-none", state.over);
  resultBox.classList.toggle("d-none", !state.over);

  if (state.over) {
    resultBox.classList.toggle("win", state.won);
    resultBox.classList.toggle("loss", !state.won);
    if (state.won) {
      resultTitle.textContent = "You won!";
      resultText.textContent = "Score: " + state.score + " / " + QUESTIONS.length +
        ". Lives left: " + state.lives + ".";
    } else {
      resultTitle.textContent = "Game over";
      resultText.textContent = "You ran out of lives. Score: " + state.score +
        " / " + QUESTIONS.length + ".";
    }
    return;
  }

  const q = QUESTIONS[state.index];

  progressEl.textContent = "Question " + (state.index + 1) + " / " + QUESTIONS.length;
  livesEl.textContent = "Lives: " + "♥".repeat(state.lives) + "♡".repeat(START_LIVES - state.lives);
  scoreEl.textContent = "Score: " + state.score;
  questionEl.textContent = q.text;

  // Build the option buttons
  optionsBox.replaceChildren();
  q.options.forEach(function (text, i) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = text;
    btn.dataset.index = i;

    if (state.removed.includes(i)) {
      btn.disabled = true;
      btn.classList.add("removed");
    }
    if (state.answered && i === q.correct) {
      btn.classList.add("correct");
    }
    if (state.answered && i === state.chosen && i !== q.correct) {
      btn.classList.add("wrong");
    }
    optionsBox.appendChild(btn);
  });

  // Message under the options
  feedbackEl.textContent = state.message;
  feedbackEl.className = "quiz-feedback";
  if (state.messageType !== "") {
    feedbackEl.classList.add(state.messageType);
  }

  // Buttons
  hintBtn.textContent = "50/50 (" + state.hints + " left)";
  hintBtn.disabled = state.hints === 0 || state.answered || state.removed.length > 0;

  const isLast = state.index === QUESTIONS.length - 1;
  nextBtn.classList.toggle("d-none", !state.answered);
  nextBtn.textContent = (isLast || state.lives === 0) ? "See result" : "Next question";
}

// ===================== MOVES =====================

// The player clicks an answer
function handleAnswer(i) {
  const q = QUESTIONS[state.index];

  // Invalid moves: show a message, do NOT change the game
  if (state.answered) {
    say("You already answered. Press the button to continue.", "info");
    render();
    return;
  }

  state.answered = true;
  state.chosen = i;

  if (i === q.correct) {
    state.score++;
    say("Correct!", "success");
  } else {
    state.lives--;
    say("Wrong answer. The correct one is highlighted.", "error");
  }
  render();
  nextBtn.focus();
}

// The player clicks 50/50
function useHint() {
 
  const q = QUESTIONS[state.index];

  // List of wrong options
  const wrong = [];
  for (let i = 0; i < q.options.length; i++) {
    if (i !== q.correct) {
      wrong.push(i);
    }
  }

  // Remove random wrong options
  for (let n = 0; n < WRONG_TO_REMOVE && wrong.length > 0; n++) {
    const r = getRandomInt(0, wrong.length - 1);
    state.removed.push(wrong[r]);
    wrong.splice(r, 1);
  }

  state.hints--;
  say("50/50 used: wrong answers removed.", "info");
  render();
}

// The player clicks "Next question" / "See result"
function nextStep() {

  const isLast = state.index === QUESTIONS.length - 1;

  if (state.lives === 0) {
    state.over = true;
    state.won = false;
  } else if (isLast && state.lives > 0) {
    state.over = true;
    state.won = true;
  } else {
    state.index++;
    state.answered = false;
    state.chosen = null;
    state.removed = [];
    say("", "");
  }
  render();

  if (!state.over) {
    optionsBox.querySelector("button").focus();
  } else {
    restartBtn.focus();
  }
}

function restart() {
  state = newState();
  render();
  optionsBox.querySelector("button").focus();
}

// One listener for all answer buttons 
optionsBox.addEventListener("click", function (e) {
  const btn = e.target.closest("button");
  if (btn === null) {
    return;
  }
  handleAnswer(Number(btn.dataset.index));
});

hintBtn.addEventListener("click", useHint);
nextBtn.addEventListener("click", nextStep);
restartBtn.addEventListener("click", restart);

// ===================== START =====================
state = newState();
render();