const START_LIVES = 3;       
const START_HINTS = 1;       // thid for 50/50 hint
const WRONG_TO_REMOVE = 2;   // how many wrong answers 50/50 removes

const QUESTIONS = [
  {
    country: "Yemen",  
    text: "Which Yemeni port gave its name to a coffee flavor?",
    options: ["Aden", "Mocha", "Hodeidah", "Mukalla"],
    correct: 1,
    fact: "Mocha was once the world's main port for exporting coffee."   
  },
  {
    country: "Yemen",   
    text: "Which island is home to the umbrella-shaped dragon's blood tree?",
    options: ["Kamaran", "Zanzibar", "Socotra", "Crete"],
    correct: 2,
    fact: "Socotra is famous for plants that grow almost nowhere else on Earth."   
  },
  
  {
    country: "South Korea",
    text: "Which fermented vegetable dish is served at almost every Korean meal?",
    options: ["Bulgogi", "Tteokbokki", "Bibimbap", "Kimchi"],
    correct: 3,
    fact: "Kimchi is usually made from cabbage and radish with chili and garlic."
  },
  {
    country: "South Korea",
    text: "Which king created the Korean alphabet, Hangul, in the 15th century?",
    options: ["King Sejong", "King Gojong", "King Taejo", "King Yeongjo"],
    correct: 0,
    fact: "Hangul was designed to be easy to learn, so more people could read."
  },
  
  {
    country: "Kazakhstan",
    text: "Which traditional two-stringed instrument is a symbol of Kazakh music?",
    options: ["Oud", "Balalaika", "Dombra", "Sitar"],
    correct: 2,
    fact: "The dombra is used to accompany songs and storytelling."
  },
  {
    country: "Kazakhstan",
    text: "Which Kazakh cosmodrome launched the first human into space in 1961?",
    options: ["Plesetsk", "Baikonur", "Vostochny", "Kourou"],
    correct: 1,
    fact: "Baikonur is the oldest and one of the biggest space launch sites in the world."
  },
 
  {
    country: "Spain",
    text: "Which architect designed La Sagrada Família in Barcelona?",
    options: ["Antoni Gaudí", "Santiago Calatrava", "Norman Foster", "Oscar Niemeyer"],
    correct: 0,
    fact: "Construction started in 1882 and it is still being finished."
  },
  {
    country: "Spain",
    text: "In which Spanish festival do people throw tomatoes at each other?",
    options: ["San Fermín", "Las Fallas", "Semana Santa", "La Tomatina"],
    correct: 3,
    fact: "La Tomatina takes place every year in the town of Buñol."
  }
];


// biringing page elements from html doc
const gameBox = document.getElementById("quiz-game");
const resultBox = document.getElementById("quiz-result");
const progressEl = document.getElementById("quiz-progress");
const quizLivesEl = document.getElementById("quiz-lives");           
const scoreEl = document.getElementById("quiz-score");
const quizQuestionEl = document.getElementById("quiz-question");    
const optionsBox = document.getElementById("quiz-options");
const feedbackEl = document.getElementById("quiz-feedback");
const hintBtn = document.getElementById("quiz-hint");
const nextBtn = document.getElementById("quiz-next");
const quizRestartBtn = document.getElementById("quiz-restart");      
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
    // ADDED: calculated value, percentage of correct answers
    const percent = Math.round(state.score / QUESTIONS.length * 100);

    resultBox.classList.toggle("win", state.won);
    resultBox.classList.toggle("loss", !state.won);
    if (state.won) {
      resultTitle.textContent = "You won!";
      // CHANGED: added the percentage to the text
      resultText.textContent = "Score: " + state.score + " / " + QUESTIONS.length +
        " (" + percent + "%). Lives left: " + state.lives + ".";
    } else {
      resultTitle.textContent = "Game over";
      // CHANGED: added the percentage to the text
      resultText.textContent = "You ran out of lives. Score: " + state.score +
        " / " + QUESTIONS.length + " (" + percent + "%).";
    }
    return;
  }

  const q = QUESTIONS[state.index];

  // CHANGED: shows the country name of the question too
  progressEl.textContent = "Question " + (state.index + 1) + " / " + QUESTIONS.length +
    " · " + q.country;
  quizLivesEl.textContent = "Lives: " + "♥".repeat(state.lives) + "♡".repeat(START_LIVES - state.lives);  
  scoreEl.textContent = "Score: " + state.score;
  quizQuestionEl.textContent = q.text;  

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
    say("Correct! " + q.fact, "success");   // CHANGED: shows the fact after "Correct!"
  } else {
    state.lives--;
    say("Wrong answer. The correct one is highlighted. " + q.fact, "error");   // CHANGED: shows the fact
  }
  render();
  nextBtn.focus();
}

// The player clicks 50/50
function useHint() {

  // ADDED: invalid move check, show a message and do NOT change the game
  if (state.hints === 0 || state.answered || state.removed.length > 0) {
    say("You can't use 50/50 now.", "info");
    render();
    return;
  }

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
    quizRestartBtn.focus();   
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
quizRestartBtn.addEventListener("click", restart);   

// ===================== START =====================
state = newState();
render();