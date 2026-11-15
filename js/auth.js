// ===== SAVED DATA (localStorage, saved as JSON) =====
// Every page that has the account links in the navbar loads this file.
// DEMO ONLY: passwords are saved as plain text, so a real password must never be used.
const USERS_KEY = "ttwUsers";       // all accounts: [{ fullName, email, phone, password }]
const SESSION_KEY = "ttwSession";   // the email of the logged-in user
const TICKETS_KEY = "ttwTickets";   // the tickets of all users

// read JSON from localStorage; if it is empty or broken, use the fallback
function readData(key, fallback) {
    try {
        const text = localStorage.getItem(key);
        if (text === null) return fallback;
        return JSON.parse(text);
    } catch (error) {
        return fallback;
    }
}

// save JSON to localStorage, returns false when the browser blocks it
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
}

// ===== ACCOUNTS =====
function getUsers() {
    const users = readData(USERS_KEY, []);
    return Array.isArray(users) ? users : [];
}

function findUser(email) {
    const users = getUsers();
    const wanted = email.trim().toLowerCase();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === wanted) {
            return users[i];
        }
    }
    return null;
}

// returns "ok", "exists" (email already used) or "storage" (browser blocked saving)
function signUpUser(fullName, email, phone, password) {
    if (findUser(email) !== null) return "exists";

    const users = getUsers();
    users.push({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password
    });
    return saveData(USERS_KEY, users) ? "ok" : "storage";
}

// returns the user when email and password are correct, otherwise null
function logInUser(email, password) {
    const user = findUser(email);
    if (user === null || user.password !== password) return null;
    saveData(SESSION_KEY, user.email);
    return user;
}

function logOutUser() {
    try {
        localStorage.removeItem(SESSION_KEY);
    } catch (error) {
        // nothing to do
    }
}

// the logged-in user, or null when nobody is logged in
function getCurrentUser() {
    const email = readData(SESSION_KEY, null);
    if (email === null) return null;
    return findUser(email);
}

// changes some details of one user, for example { fullName: "...", phone: "...", photo: "data:image/jpeg;base64,..." }
// the email and the password are never changed here
// returns "ok", "missing" (no such user) or "storage" (browser blocked saving)
function updateUser(email, changes) {
    const users = getUsers();
    const wanted = email.trim().toLowerCase();

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === wanted) {
            for (const key in changes) {
                if (key !== "email" && key !== "password") {
                    users[i][key] = changes[key];
                }
            }
            return saveData(USERS_KEY, users) ? "ok" : "storage";
        }
    }
    return "missing";
}

// ===== TICKETS =====
// A ticket is saved by the Plan My Trip page and looks like this:
// { id: "TTW-AB12CD", owner: "name@example.com", destination: "spain", styleName: "Comfort",
//   startDate: "2026-12-10", days: 5, travelers: 2, total: 1760 }
function makeTicketId() {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "TTW-";
    for (let i = 0; i < 6; i++) {
        id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return id;
}

// the tickets of one user, the soonest trip first
function getTickets(email) {
    const all = readData(TICKETS_KEY, []);
    const mine = [];
    if (!Array.isArray(all)) return mine;

    for (let i = 0; i < all.length; i++) {
        if (all[i].owner === email) {
            mine.push(all[i]);
        }
    }
    mine.sort(function (a, b) {
        return a.startDate < b.startDate ? -1 : 1;
    });
    return mine;
}

// adds the id to the ticket and saves it, returns the ticket (or null if saving failed)
function addTicket(ticket) {
    const all = readData(TICKETS_KEY, []);
    ticket.id = makeTicketId();
    all.push(ticket);
    return saveData(TICKETS_KEY, all) ? ticket : null;
}

function removeTicket(id, email) {
    const all = readData(TICKETS_KEY, []);
    const left = [];
    for (let i = 0; i < all.length; i++) {
        if (!(all[i].id === id && all[i].owner === email)) {
            left.push(all[i]);
        }
    }
    saveData(TICKETS_KEY, left);
}

// removes all tickets of one user, the tickets of other users stay
function clearTickets(email) {
    const all = readData(TICKETS_KEY, []);
    const left = [];
    for (let i = 0; i < all.length; i++) {
        if (all[i].owner !== email) {
            left.push(all[i]);
        }
    }
    saveData(TICKETS_KEY, left);
}

// ===== NAVBAR =====
// fills <li id="authNav"> : "Log in" and "Sign up", or "Profile" and "Log out"
function makeNavLink(text, href) {
    const link = document.createElement("a");
    link.className = "nav-link";
    link.href = href;
    link.textContent = text;

    // highlight the link of the page we are on
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    if (currentPage === href) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
    return link;
}

function updateNav() {
    const slot = document.getElementById("authNav");
    if (slot === null) return;

    slot.innerHTML = "";

    if (getCurrentUser() === null) {
        slot.appendChild(makeNavLink("Log in", "login.html"));
        slot.appendChild(makeNavLink("Sign up", "signup.html"));
        return;
    }

    slot.appendChild(makeNavLink("Profile", "profile.html"));

    const logout = document.createElement("button");
    logout.type = "button";
    logout.className = "nav-link";
    logout.id = "navLogout";
    logout.textContent = "Log out";
    logout.addEventListener("click", function () {
        logOutUser();
        window.location.href = "index.html";
    });
    slot.appendChild(logout);
}

updateNav();
