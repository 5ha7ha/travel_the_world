// ===== CONSTANTS =====
const MAX_LIVES = 3;

// Population in millions (approximate), from largest to smallest
const countries = [
    { name: "India",          value: 1430 },
    { name: "China",          value: 1410 },
    { name: "USA",            value: 340 },
    { name: "Indonesia",      value: 278 },
    { name: "Pakistan",       value: 245 },
    { name: "Nigeria",        value: 224 },
    { name: "Brazil",         value: 217 },
    { name: "Bangladesh",     value: 173 },
    { name: "Russia",         value: 144 },
    { name: "Mexico",         value: 128 },
    { name: "Ethiopia",       value: 126 },
    { name: "Japan",          value: 124 },
    { name: "Philippines",    value: 117 },
    { name: "Egypt",          value: 112 },
    { name: "DR Congo",       value: 105 },
    { name: "Vietnam",        value: 100 },
    { name: "Iran",           value: 89 },
    { name: "Turkey",         value: 85 },
    { name: "Germany",        value: 84 },
    { name: "Thailand",       value: 72 },
    { name: "United Kingdom", value: 68 },
    { name: "France",         value: 68 },
    { name: "Tanzania",       value: 67 },
    { name: "South Africa",   value: 60 },
    { name: "Italy",          value: 59 },
    { name: "Kenya",          value: 54 },
    { name: "Myanmar",        value: 54 },
    { name: "South Korea",    value: 52 },
    { name: "Colombia",       value: 52 },
    { name: "Spain",          value: 48 },
    { name: "Uganda",         value: 48 },
    { name: "Sudan",          value: 48 },
    { name: "Argentina",      value: 46 },
    { name: "Algeria",        value: 46 },
    { name: "Iraq",           value: 45 },
    { name: "Afghanistan",    value: 42 },
    { name: "Canada",         value: 40 },
    { name: "Poland",         value: 38 },
    { name: "Morocco",        value: 38 },
    { name: "Ukraine",        value: 37 },
    { name: "Saudi Arabia",   value: 36 },
    { name: "Uzbekistan",     value: 36 },
    { name: "Peru",           value: 34 },
    { name: "Malaysia",       value: 34 },
    { name: "Yemen",          value: 34 },
    { name: "Ghana",          value: 34 },
    { name: "Nepal",          value: 30 },
    { name: "Madagascar",     value: 30 },
    { name: "Venezuela",      value: 28 },
    { name: "Australia",      value: 26 },
    { name: "Sri Lanka",      value: 22 },
    { name: "Kazakhstan",     value: 20 },
    { name: "Chile",          value: 20 },
    { name: "Netherlands",    value: 18 }
];

// ===== GAME STATE =====
let lives;
let streak;
let bestStreak = 0;
let currentIndex;
let nextIndex;
let gameOver;

// ===== PAGE ELEMENTS =====
const boardEl = document.getElementById("gameBoard");
const livesEl = document.getElementById("lives");
const streakEl = document.getElementById("streak");
const bestEl = document.getElementById("best");
const currentNameEl = document.getElementById("currentName");
const currentValueEl = document.getElementById("currentValue");
const nextNameEl = document.getElementById("nextName");
const nextValueEl = document.getElementById("nextValue");
const questionEl = document.getElementById("gameQuestion");
const messageEl = document.getElementById("gameMessage");
const higherBtn = document.getElementById("higherBtn");
const lowerBtn = document.getElementById("lowerBtn");
const restartBtn = document.getElementById("restartBtn");

// ===== FUNCTIONS =====

// random whole number from min to max (both included)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// choose the next country, it must not be the same as the current one
function pickNextCountry() {
    nextIndex = randomInt(0, countries.length - 1);
    while (nextIndex === currentIndex) {
        nextIndex = randomInt(0, countries.length - 1);
    }
}

// show the current state on the page
function showState() {
    livesEl.textContent = lives;
    streakEl.textContent = streak;
    bestEl.textContent = bestStreak;

    currentNameEl.textContent = countries[currentIndex].name;
    currentValueEl.textContent = countries[currentIndex].value + " million";
    nextNameEl.textContent = countries[nextIndex].name;
    nextValueEl.textContent = "?";

    if (gameOver === true) {
        questionEl.textContent = "Game over!";
    } else {
        questionEl.textContent = "Does " + countries[nextIndex].name +
            " have a higher or lower population than " + countries[currentIndex].name + "?";
    }

    boardEl.classList.toggle("game-over", gameOver);
}

// start a new game (also used by the Restart button)
function startGame() {
    lives = MAX_LIVES;
    streak = 0;
    gameOver = false;
    currentIndex = randomInt(0, countries.length - 1);
    pickNextCountry();
    messageEl.textContent = "";
    messageEl.className = "game-message";
    showState();
}

// the player clicked "higher" or "lower"
function checkGuess(guess) {
    // invalid move: show a message and change nothing
    if (gameOver === true) {
        messageEl.textContent = "The game is over. Press Restart to play again.";
        messageEl.className = "game-message wrong";
        return;
    }

    const current = countries[currentIndex];
    const next = countries[nextIndex];

    // equal values count as a right guess
    const isRight = (guess === "higher" && next.value >= current.value) ||
                    (guess === "lower" && next.value <= current.value);

    const info = next.name + " has " + next.value + " million.";

    if (isRight === true) {
        streak = streak + 1;
        if (streak > bestStreak) {
            bestStreak = streak;
        }
        messageEl.textContent = "Correct! " + info;
        messageEl.className = "game-message correct";
    } else {
        lives = lives - 1;
        streak = 0;
        messageEl.textContent = "Wrong! " + info;
        messageEl.className = "game-message wrong";
        if (lives === 0) {
            gameOver = true;
            messageEl.textContent = messageEl.textContent + " No lives left.";
        }
    }

    // if the game goes on, the next country becomes the current one
    if (gameOver === false) {
        currentIndex = nextIndex;
        pickNextCountry();
    }

    showState();
}

// ===== EVENTS =====
higherBtn.addEventListener("click", function () {
    checkGuess("higher");
});

lowerBtn.addEventListener("click", function () {
    checkGuess("lower");
});

restartBtn.addEventListener("click", startGame);

startGame();