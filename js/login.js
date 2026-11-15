// ===== PAGE ELEMENTS =====
const form = document.getElementById("loginForm");
const fields = {
    email:    document.getElementById("email"),
    password: document.getElementById("password")
};

// a logged-in visitor does not need this page
if (getCurrentUser() !== null) {
    window.location.replace("profile.html");
}

// ===== VALIDATION RULES =====
const rules = {
    email: function (value) {
        if (value.trim() === "") return "Please enter your email.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "Enter a valid email, like name@example.com.";
        return "";
    },
    password: function (value) {
        if (value === "") return "Please enter your password.";
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

// ===== EVENTS =====
for (const name in fields) {
    const input = fields[name];

    input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid") || input.classList.contains("is-valid")) {
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

    const user = logInUser(fields.email.value, fields.password.value);

    if (user === null) {
        // the same message for a wrong email and a wrong password
        document.getElementById("passwordError").textContent = "Wrong email or password. Check them, or sign up.";
        fields.password.classList.remove("is-valid");
        fields.password.classList.add("is-invalid");
        fields.password.focus();
        return;
    }

    window.location.href = "profile.html";
});
