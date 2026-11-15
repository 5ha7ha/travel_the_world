// ===== DATA =====
// the countries come from js/data.js (each country has a costTier: 1 = cheap ... 4 = expensive)
// auth.js (loaded before this file) gives us getCurrentUser() and addTicket()

// price per person per day in US dollars (Budget style) for each cost tier
const tierPrices = { 1: 50, 2: 70, 3: 100, 4: 140 };
const DEFAULT_TIER = 2;          // used when a country has no costTier, so the price is never NaN

const PEAK_MONTHS = [5, 6, 7, 11];   // Jun, Jul, Aug, Dec (month numbers start at 0)
const PEAK_EXTRA = 0.15;             // +15% in peak season
const GROUP_MIN = 4;                 // 4 or more travelers
const GROUP_DISCOUNT = 0.10;         // -10%
const LONG_MIN = 10;                 // 10 or more days
const LONG_DISCOUNT = 0.05;          // -5%

const styles = [
    { key: "budget",  name: "Budget",  multiplier: 1 },
    { key: "comfort", name: "Comfort", multiplier: 1.6 },
    { key: "luxury",  name: "Luxury",  multiplier: 2.5 }
];

// ===== PAGE ELEMENTS =====
const form = document.getElementById("tripForm");
const fields = {
    fullName:    document.getElementById("fullName"),
    email:       document.getElementById("email"),
    phone:       document.getElementById("phone"),
    destination: document.getElementById("destination"),
    tripStyle:   document.getElementById("tripStyle"),
    startDate:   document.getElementById("startDate"),
    days:        document.getElementById("days"),
    travelers:   document.getElementById("travelers")
};
const loginNotice = document.getElementById("loginNotice");

// ===== HELPERS =====
function findByKey(list, key) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].key === key) {
            return list[i];
        }
    }
    return null;
}

// "2026-11-10" -> a Date at local midnight (not UTC)
function parseLocalDate(value) {
    const parts = value.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]); //month - 1 converts it to the 0-based index that Date expects.
}

// the start date cannot be today or in the past
function toDateString(date) {
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + m + "-" + d;
}

// ===== FILL THE SELECTS FROM THE ARRAYS =====
function fillSelect(select, items) {
    for (let i = 0; i < items.length; i++) {
        const option = document.createElement("option");
        option.value = items[i].key;
        option.textContent = items[i].name;
        select.appendChild(option);
    }
}

fillSelect(fields.destination, countries);
fillSelect(fields.tripStyle, styles);

// country.html links here with plan.html?c=korea, so the country is already chosen
const preselected = new URLSearchParams(window.location.search).get("c");
if (findByKey(countries, preselected) !== null) {
    fields.destination.value = preselected;
}

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
fields.startDate.min = toDateString(tomorrow);

// ===== LOGGED-IN USER: PREFILL AND NOTICE =====
// puts the name, email and phone of the logged-in user into the form
function prefillUser() {
    const user = getCurrentUser();
    if (user === null) return;
    fields.fullName.value = user.fullName;
    fields.email.value = user.email;
    fields.phone.value = user.phone;
}

// the message above the form: "Booking as ..." or "Log in to book"
function showLoginNotice(message) {
    const user = getCurrentUser();
    loginNotice.textContent = "";

    if (message !== undefined) {
        loginNotice.append(message + " ");
    } else if (user !== null) {
        loginNotice.append("Booking as " + user.fullName + ". Your ticket will be saved in your profile.");
        return;
    } else {
        loginNotice.append("You can plan a trip and see the cost, but you need an account to book it. ");
    }

    const login = document.createElement("a");
    login.href = "login.html";
    login.textContent = "Log in";
    const signup = document.createElement("a");
    signup.href = "signup.html";
    signup.textContent = "Sign up";
    loginNotice.append(login, " or ", signup, ".");
}

// ===== VALIDATION RULES =====
// every rule returns an error text, or "" when the value is correct
const rules = {
    fullName: function (value) {
        if (value.trim() === "") return "Please enter your full name.";
        if (value.trim().length < 3) return "Name must have at least 3 characters.";
        if (!/^[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF' -]+$/.test(value.trim())) return "Name can contain only letters and spaces.";
        return "";
    },
    email: function (value) {
        if (value.trim() === "") return "Please enter your email.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "Enter a valid email, like name@example.com.";
        return "";
    },
    phone: function (value) {
        if (value.trim() === "") return "Please enter your phone number.";
        const digits = value.replace(/\D/g, "");
        if (!/^\+?[0-9\s\-()]+$/.test(value.trim()) || digits.length < 7 || digits.length > 15)
            return "Use 7 to 15 digits. A + at the start is allowed.";
        return "";
    },
    destination: function (value) {
        if (value === "") return "Please choose a country.";
        return "";
    },
    tripStyle: function (value) {
        if (value === "") return "Please choose a travel style.";
        return "";
    },
    startDate: function (value) {
        if (value === "") return "Please choose a start date.";
        const chosen = parseLocalDate(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen <= today) return "The start date must be in the future.";
        return "";
    },
    days: function (value) {
        if (value === "") return "Please enter the number of days.";
        const number = Number(value);
        if (!Number.isInteger(number) || number < 1 || number > 30) return "Days must be a whole number from 1 to 30.";
        return "";
    },
    travelers: function (value) {
        if (value === "") return "Please enter the number of travelers.";
        const number = Number(value);
        if (!Number.isInteger(number) || number < 1 || number > 10) return "Travelers must be a whole number from 1 to 10.";
        return "";
    }
};

// show or clear the error under one field, returns true when the field is correct
function validateField(name) {
    const input = fields[name];
    const message = rules[name](input.value);
    const errorEl = document.getElementById(name + "Error");

    errorEl.textContent = message;
    input.classList.toggle("is-invalid", message !== "");
    input.classList.toggle("is-valid", message === "");
    return message === "";
}

function validateAll() {
    let firstInvalid = null;
    for (const name in fields) {
        if (!validateField(name) && firstInvalid === null) {
            firstInvalid = fields[name];
        }
    }
    return firstInvalid;
}

// ===== COST AND SUMMARY =====
// price per person per day (Budget style): it comes from the cost tier of the country
function getDailyPrice(destination) {
    const tier = destination.costTier in tierPrices ? destination.costTier : DEFAULT_TIER;
    return tierPrices[tier];
}

// season, group and long-trip rules. Returns the factor and a short text for each rule that applied
function getAdjustments(startDate, days, travelers) {
    let factor = 1;
    const labels = [];

    if (startDate !== "" && PEAK_MONTHS.includes(parseLocalDate(startDate).getMonth())) {
        factor = factor * (1 + PEAK_EXTRA);
        labels.push("Peak season +" + Math.round(PEAK_EXTRA * 100) + "%");
    }
    if (travelers >= GROUP_MIN) {
        factor = factor * (1 - GROUP_DISCOUNT);
        labels.push("Group discount -" + Math.round(GROUP_DISCOUNT * 100) + "%");
    }
    if (days >= LONG_MIN) {
        factor = factor * (1 - LONG_DISCOUNT);
        labels.push("Long trip discount -" + Math.round(LONG_DISCOUNT * 100) + "%");
    }
    return { factor: factor, labels: labels };
}

function calculateTotal(destination, style, days, travelers, startDate) {
    if (!destination || !style || days < 1 || travelers < 1) {
        return 0;
    }
    const adjust = getAdjustments(startDate, days, travelers);
    return Math.round(getDailyPrice(destination) * style.multiplier * days * travelers * adjust.factor);
}

function formatDate(value) {
    if (value === "") return "-";
    return parseLocalDate(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function updateSummary() {
    const destination = findByKey(countries, fields.destination.value);
    const style = findByKey(styles, fields.tripStyle.value);
    const days = Number(fields.days.value) || 0;
    const travelers = Number(fields.travelers.value) || 0;
    const startDate = fields.startDate.value;

    document.getElementById("sumDestination").textContent = destination ? destination.name : "-";
    document.getElementById("sumStyle").textContent = style ? style.name : "-";
    document.getElementById("sumTravelers").textContent = travelers > 0 ? travelers : "-";

    // dates: start date and the last day of the trip
    let dates = formatDate(startDate);
    if (startDate !== "" && days > 0) {
        const end = parseLocalDate(startDate);
        end.setDate(end.getDate() + days - 1);
        dates = dates + " to " + formatDate(toDateString(end));
    }
    document.getElementById("sumDates").textContent = dates;

    // flag block
    const flagBox = document.getElementById("summaryFlag");
    const emptyText = document.getElementById("summaryEmpty");
    if (destination) {
        document.getElementById("summaryFlagImg").src = destination.flag;
        document.getElementById("summaryFlagImg").alt = "Flag of " + destination.name;
        document.getElementById("summaryCapital").textContent = destination.capital + " · " + destination.currency;
        flagBox.hidden = false;
        emptyText.hidden = true;
    } else {
        flagBox.hidden = true;
        emptyText.hidden = false;
    }

    const total = calculateTotal(destination, style, days, travelers, startDate);
    document.getElementById("sumTotal").textContent = "$" + total.toLocaleString("en-US");

    // which price rules were applied
    const adjust = getAdjustments(startDate, days, travelers);
    document.getElementById("sumRules").textContent = total > 0 ? adjust.labels.join(" · ") : "";
}

// ===== EVENTS =====
for (const name in fields) {
    const input = fields[name];
    const eventName = input.tagName === "SELECT" ? "change" : "input";

    input.addEventListener(eventName, function () {
        // a field that already shows an error is re-checked while the user types,
        // so the error disappears as soon as the value is correct
        if (input.classList.contains("is-invalid") || input.classList.contains("is-valid")) {
            validateField(name);
        }
        updateSummary();
    });

    input.addEventListener("blur", function () {
        if (input.value !== "") {
            validateField(name);
        }
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstInvalid = validateAll();
    if (firstInvalid !== null) {
        firstInvalid.focus();
        return;
    }

    // only a logged-in user can book, because the ticket is saved in the profile
    const user = getCurrentUser();
    if (user === null) {
        showLoginNotice("Please log in to book your trip.");
        loginNotice.classList.add("notice-error");
        loginNotice.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    showSuccess(user);
});

// ===== SAVE THE TICKET AND SHOW THE BIG TICKET (jQuery) =====
function showSuccess(user) {
    const destination = findByKey(countries, fields.destination.value);
    const style = findByKey(styles, fields.tripStyle.value);
    const days = Number(fields.days.value);
    const travelers = Number(fields.travelers.value);
    const startDate = fields.startDate.value;
    const total = calculateTotal(destination, style, days, travelers, startDate);

    // the small ticket for the profile page (the id is added by addTicket)
    const ticket = addTicket({
        owner: user.email,
        destination: destination.key,
        styleName: style.name,
        startDate: startDate,
        days: days,
        travelers: travelers,
        total: total
    });

    if (ticket === null) {
        showLoginNotice("Your browser blocked saving data, so the ticket was not saved. Allow site data and try again.");
        loginNotice.classList.add("notice-error");
        return;
    }
    loginNotice.classList.remove("notice-error");

    // the big ticket
    document.getElementById("stampFlag").src = destination.flag;
    document.getElementById("stampFlag").alt = "Flag of " + destination.name;
    document.getElementById("stampId").textContent = "Ticket " + ticket.id;
    document.getElementById("stampText").textContent =
        "Thank you, " + user.fullName.trim().split(" ")[0] + "! " +
        days + (days === 1 ? " day" : " days") + " in " + destination.name + " for " + travelers +
        (travelers === 1 ? " traveler" : " travelers") + ", from " + formatDate(startDate) +
        ". Estimated cost: $" + total.toLocaleString("en-US") + ".";
    document.getElementById("stampLink").href = destination.page;

    // clear the form and the summary, then fill the user's details again
    form.reset();
    for (const name in fields) {
        fields[name].classList.remove("is-valid", "is-invalid");
        document.getElementById(name + "Error").textContent = "";
    }
    prefillUser();
    updateSummary();

    // .stop(true, true) prevents the effects from piling up on fast repeated clicks
    $("#successBox").stop(true, true).hide().prop("hidden", false).slideDown(400);
    $("html, body").stop(true).animate({ scrollTop: $("#successBox").offset().top - 80 }, 500);
}

$("#againBtn").on("click", function () {
    $("#successBox").stop(true, true).slideUp(300);
    $("html, body").stop(true).animate({ scrollTop: 0 }, 400);
    fields.destination.focus();
});

// ===== START =====
prefillUser();
showLoginNotice();
updateSummary