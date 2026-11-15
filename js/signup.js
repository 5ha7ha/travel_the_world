// ===== PAGE ELEMENTS =====
const form = document.getElementById("signupForm");
const fields = {
    fullName:        document.getElementById("fullName"),
    email:           document.getElementById("email"),
    phone:           document.getElementById("phone"),
    password:        document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword")
};

// a logged-in visitor does not need this page
if (getCurrentUser() !== null) {
    window.location.replace("profile.html");
}

// ===== VALIDATION RULES =====
// every rule returns an error text, or "" when the value is correct
const rules = {
    fullName: function (value) {
        if (value.trim() === "") return "Please enter your full name.";
        if (value.trim().length < 3) return "Name must have at least 3 characters.";
        if (!/^[A-Za-zÀ-ɏЀ-ӿ؀-ۿ' -]+$/.test(value.trim())) return "Name can contain only letters and spaces.";
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
    password: function (value) {
        if (value === "") return "Please create a password.";
        if (value.length < 8) return "Password must have at least 8 characters.";
        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) return "Use at least one letter and one number.";
        return "";
    },
    confirmPassword: function (value) {
        if (value === "") return "Please repeat your password.";
        if (value !== fields.password.value) return "The passwords do not match.";
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

// an error that does not come from a rule (for example "email already used")
function showFieldError(name, message) {
    document.getElementById(name + "Error").textContent = message;
    fields[name].classList.remove("is-valid");
    fields[name].classList.add("is-invalid");
    fields[name].focus();
}

// ===== EVENTS =====
for (const name in fields) {
    const input = fields[name];

    input.addEventListener("input", function () {
        // a field that already shows a state is re-checked while the user types,
        // so the error disappears as soon as the value is correct
        if (input.classList.contains("is-invalid") || input.classList.contains("is-valid")) {
            validateField(name);
        }
        // the repeated password depends on the password
        if (name === "password" && fields.confirmPassword.value !== "") {
            validateField("confirmPassword");
        }
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

    const result = signUpUser(
        fields.fullName.value,
        fields.email.value,
        fields.phone.value,
        fields.password.value
    );

    if (result === "exists") {
        showFieldError("email", "This email already has an account. Try logging in.");
        return;
    }
    if (result === "storage") {
        showFieldError("email", "Your browser blocked saving data. Allow site data and try again.");
        return;
    }

    showSuccess();
});

// ===== SUCCESS MESSAGE (jQuery) =====
function showSuccess() {
    const firstName = fields.fullName.value.trim().split(" ")[0];
    document.getElementById("stampText").textContent =
        "Welcome, " + firstName + "! Your account is ready. Log in to see your profile.";

    // clear the form
    form.reset();
    for (const name in fields) {
        fields[name].classList.remove("is-valid", "is-invalid");
        document.getElementById(name + "Error").textContent = "";
    }

    // .stop(true, true) prevents the effects from piling up on fast repeated clicks
    $("#successBox").stop(true, true).hide().prop("hidden", false).slideDown(400);
    $("html, body").stop(true).animate({ scrollTop: $("#successBox").offset().top - 80 }, 500);
}
