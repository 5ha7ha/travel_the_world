// ===== THE QUESTIONS AND ANSWERS =====
const worldFacts = [
    { question: "How many countries are there in the world?", answer: "195" },
    {
        question: "How many languages are spoken in the world?",
        answer: "7100+",
        note: "There are 7,170 living languages spoken in the world today. However, linguistic diversity is heavily concentrated. Just the top 20 languages are spoken by more than half of the entire global population. Conversely, about 44% of the world's languages are considered endangered, often spoken by fewer than 1,000 people."
    },
    { question: "How many continents are there?", answer: "7" },
    { question: "How many oceans are there?", answer: "5" },
    { question: "How many currencies are in use?", answer: "About 180" },
    { question: "How many people live on Earth?", answer: "About 8 billion" },
    { question: "What is the largest country?", answer: "Russia" },
    { question: "What is the smallest country?", answer: "Vatican City" },
    { question: "What is the most visited country?", answer: "France" }
];

const flipGrid = document.getElementById("flipGrid");
const factNote = document.getElementById("factNote");
const factNoteText = document.getElementById("factNoteText");

let openCard = null;   // the card that shows its answer now, or null when all are closed

// makes one <span> with a class and a text
function makeSpan(className, text) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    return span;
}

// shows the right side of the card and tells screen readers which side is visible
function setFlipped(card, flipped) {
    card.classList.toggle("is-flipped", flipped);
    card.setAttribute("aria-pressed", String(flipped));
    card.querySelector(".flip-front").setAttribute("aria-hidden", String(flipped));
    card.querySelector(".flip-back").setAttribute("aria-hidden", String(!flipped));
}

// shows the note under the cards, or hides it when there is no text
function showNote(text) {
    if (text === undefined) {
        factNote.hidden = true;
        return;
    }
    factNoteText.textContent = text;
    factNote.hidden = false;
}

// the visitor clicked a card
function handleCardClick(card, fact) {
    // clicking the open card closes it
    if (openCard === card) {
        setFlipped(card, false);
        openCard = null;
        showNote(undefined);
        return;
    }

    // another card is open: close it first
    if (openCard !== null) {
        setFlipped(openCard, false);
    }

    setFlipped(card, true);
    openCard = card;
    showNote(fact.note);   // undefined for cards without a note, so the note hides
}

// builds one card from one object of the array
function buildFlipCard(fact) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "flip-card";

    const inner = document.createElement("span");
    inner.className = "flip-inner";
    inner.append(
        makeSpan("flip-front", fact.question),
        makeSpan("flip-back", fact.answer)
    );
    card.appendChild(inner);

    setFlipped(card, false);
    card.addEventListener("click", function () {
        handleCardClick(card, fact);
    });
    return card;
}

// one card for every fact
worldFacts.forEach(function (fact) {
    flipGrid.appendChild(buildFlipCard(fact));
});