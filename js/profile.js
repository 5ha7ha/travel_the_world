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
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDate(date) {
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// "10 Dec 2026 to 14 Dec 2026" from the start date and the number of days
function ticketDates(ticket) {
    const start = parseLocalDate(ticket.startDate);
    if (ticket.days <= 1) return formatDate(start);

    const end = new Date(start);
    end.setDate(end.getDate() + ticket.days - 1);
    return formatDate(start) + " to " + formatDate(end);
}

function plural(number, word) {
    return number + " " + word + (number === 1 ? "" : "s");
}

// makes one element with a class and a text
function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

// ===== ONE SMALL TICKET =====
function makeTicket(ticket) {
    const country = findByKey(countries, ticket.destination);
    const countryName = country !== null ? country.name : ticket.destination;

    const item = makeElement("li", "ticket-small");
    if (country !== null) {
        item.style.setProperty("--ticket-accent", country.accent);
    }

    // flag
    if (country !== null) {
        const flag = makeElement("img", "ticket-flag");
        flag.src = country.flag;
        flag.alt = "Flag of " + country.name;
        item.appendChild(flag);
    }

    // text: title + price on the first line, dates and details below
    const info = makeElement("div", "ticket-info");
    const top = makeElement("div", "ticket-top");
    top.appendChild(makeElement("strong", "ticket-title", countryName + " · " + plural(ticket.days, "day")));
    top.appendChild(makeElement("span", "ticket-price", "$" + ticket.total.toLocaleString("en-US")));
    info.appendChild(top);
    info.appendChild(makeElement("span", "ticket-meta",
        ticketDates(ticket) + " · " + plural(ticket.travelers, "traveler") + " · " + ticket.styleName));
    item.appendChild(info);

    // remove button
    const remove = makeElement("button", "ticket-remove", "×");
    remove.type = "button";
    remove.dataset.id = ticket.id;
    remove.setAttribute("aria-label", "Remove the ticket to " + countryName);
    item.appendChild(remove);

    return item;
}

// ===== EDIT PROFILE: RULES =====
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;   // the chosen file can be up to 5 MB, we shrink it before saving
const PHOTO_SIZE = 200;                     // the saved photo is 200 x 200 pixels (small, so localStorage does not fill up)

const editRules = {
    fullName: function (value) {
        if (value.trim() === "") return "Please enter your full name.";
        if (value.trim().length < 3) return "Name must have at least 3 characters.";
        if (!/^[A-Za-z\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF' -]+$/.test(value.trim())) return "Name can contain only letters and spaces.";
        return "";
    },
    phone: function (value) {
        if (value.trim() === "") return "Please enter your phone number.";
        const digits = value.replace(/\D/g, "");
        if (!/^\+?[0-9\s\-()]+$/.test(value.trim()) || digits.length < 7 || digits.length > 15)
            return "Use 7 to 15 digits. A + at the start is allowed.";
        return "";
    }
};

// reads the chosen image, cuts the middle square, shrinks it and gives back a small JPEG (data URL)
// callback(dataUrl) or callback(null) when the file cannot be read as an image
function shrinkPhoto(file, callback) {
    const reader = new FileReader();

    reader.onload = function () {
        const image = new Image();

        image.onload = function () {
            const side = Math.min(image.width, image.height);
            const canvas = document.createElement("canvas");
            canvas.width = PHOTO_SIZE;
            canvas.height = PHOTO_SIZE;

            const context = canvas.getContext("2d");
            context.drawImage(
                image,
                (image.width - side) / 2, (image.height - side) / 2, side, side,
                0, 0, PHOTO_SIZE, PHOTO_SIZE
            );
            callback(canvas.toDataURL("image/jpeg", 0.85));
        };
        image.onerror = function () { callback(null); };
        image.src = reader.result;
    };
    reader.onerror = function () { callback(null); };
    reader.readAsDataURL(file);
}

// ===== THE PROFILE PAGE =====
function showProfile(startUser) {
    let user = startUser;

    const list = document.getElementById("ticketList");
    const empty = document.getElementById("ticketEmpty");
    const summary = document.getElementById("ticketSummary");
    const clearBtn = document.getElementById("clearTickets");

    const avatar = document.getElementById("profileAvatar");
    const editForm = document.getElementById("editForm");
    const editBtn = document.getElementById("editBtn");
    const savedMessage = document.getElementById("profileSaved");
    const photoInput = document.getElementById("photoInput");
    const photoError = document.getElementById("photoError");
    const photoBtn = document.getElementById("photoBtn");
    const photoRemove = document.getElementById("photoRemove");
    const editFields = {
        fullName: document.getElementById("editName"),
        phone:    document.getElementById("editPhone")
    };

    // the photo that is waiting for "Save": undefined = no change, "" = removed, text = a new photo
    let pendingPhoto;

    // ----- account data and avatar -----
    // shows the photo, or the first letter of the name when there is no photo
    function drawAvatar(photo, name) {
        avatar.innerHTML = "";
        if (photo) {
            const img = document.createElement("img");
            img.src = photo;
            img.alt = "";
            avatar.appendChild(img);
        } else {
            avatar.textContent = name.trim().charAt(0).toUpperCase();
        }
        photoRemove.hidden = !photo;
        photoBtn.textContent = photo ? "Change photo" : "Set photo";
    }

    function showDetails() {
        document.getElementById("profileName").textContent = user.fullName;
        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profilePhone").textContent = user.phone;
        drawAvatar(user.photo, user.fullName);
    }

    document.getElementById("profileLogout").addEventListener("click", function () {
        logOutUser();
        window.location.href = "index.html";
    });

    // ----- edit profile: open and close -----
    function clearEditErrors() {
        for (const name in editFields) {
            editFields[name].classList.remove("is-valid", "is-invalid");
            document.getElementById(name + "Error").textContent = "";
        }
        photoError.textContent = "";
    }

    function openEdit() {
        pendingPhoto = undefined;
        editFields.fullName.value = user.fullName;
        editFields.phone.value = user.phone;
        clearEditErrors();
        savedMessage.textContent = "";
        showDetails();

        editBtn.setAttribute("aria-expanded", "true");
        $("#editForm").stop(true, true).hide().prop("hidden", false).slideDown(250);
        editFields.fullName.focus();
    }

    function closeEdit() {
        pendingPhoto = undefined;
        showDetails();                     // forgets a photo that was not saved
        editBtn.setAttribute("aria-expanded", "false");
        $("#editForm").stop(true, true).slideUp(200, function () {
            editForm.hidden = true;
        });
        editBtn.focus();
    }

    editBtn.addEventListener("click", function () {
        if (editForm.hidden) {
            openEdit();
        } else {
            closeEdit();
        }
    });
    document.getElementById("editCancel").addEventListener("click", closeEdit);

    // ----- edit profile: photo -----
    photoBtn.addEventListener("click", function () {
        photoInput.click();
    });

    photoInput.addEventListener("change", function () {
        const file = photoInput.files[0];
        photoInput.value = "";             // so the same file can be chosen again
        if (file === undefined) return;

        // wrong input: show a message and change nothing
        if (!file.type.startsWith("image/")) {
            photoError.textContent = "Please choose an image file (JPG, PNG, WebP...).";
            return;
        }
        if (file.size > MAX_PHOTO_BYTES) {
            photoError.textContent = "The photo is too big. Choose one smaller than 5 MB.";
            return;
        }

        shrinkPhoto(file, function (dataUrl) {
            if (dataUrl === null) {
                photoError.textContent = "This file could not be read as an image.";
                return;
            }
            photoError.textContent = "";
            pendingPhoto = dataUrl;
            drawAvatar(dataUrl, editFields.fullName.value || user.fullName);   // preview
        });
    });

    photoRemove.addEventListener("click", function () {
        pendingPhoto = "";
        photoError.textContent = "";
        drawAvatar("", editFields.fullName.value || user.fullName);
    });

    // ----- edit profile: validation and save -----
    function validateEditField(name) {
        const input = editFields[name];
        const message = editRules[name](input.value);
        document.getElementById(name + "Error").textContent = message;
        input.classList.toggle("is-invalid", message !== "");
        input.classList.toggle("is-valid", message === "");
        return message === "";
    }

    for (const name in editFields) {
        editFields[name].addEventListener("input", function () {
            if (editFields[name].classList.contains("is-invalid") || editFields[name].classList.contains("is-valid")) {
                validateEditField(name);
            }
        });
        editFields[name].addEventListener("blur", function () {
            if (editFields[name].value !== "") validateEditField(name);
        });
    }

    editForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let firstInvalid = null;
        for (const name in editFields) {
            if (!validateEditField(name) && firstInvalid === null) {
                firstInvalid = editFields[name];
            }
        }
        if (firstInvalid !== null) {
            firstInvalid.focus();
            return;
        }

        const changes = {
            fullName: editFields.fullName.value.trim(),
            phone: editFields.phone.value.trim()
        };
        if (pendingPhoto !== undefined) {
            changes.photo = pendingPhoto;
        }

        const result = updateUser(user.email, changes);
        if (result !== "ok") {
            photoError.textContent = "Your browser blocked saving data (or the photo is too big for it). Allow site data and try again.";
            return;
        }

        user = findUser(user.email);       // the saved version
        pendingPhoto = undefined;
        showDetails();
        editBtn.setAttribute("aria-expanded", "false");
        $("#editForm").stop(true, true).slideUp(200, function () {
            editForm.hidden = true;
        });
        savedMessage.textContent = "Profile saved.";
        editBtn.focus();
    });

    // ----- tickets -----
    // draw the list of tickets, with the counter and the total
    function showTickets() {
        const tickets = getTickets(user.email);
        let total = 0;

        list.innerHTML = "";
        for (let i = 0; i < tickets.length; i++) {
            list.appendChild(makeTicket(tickets[i]));
            total += tickets[i].total;
        }

        empty.hidden = tickets.length > 0;
        clearBtn.hidden = tickets.length === 0;
        summary.textContent = tickets.length > 0
            ? plural(tickets.length, "ticket") + " · total $" + total.toLocaleString("en-US")
            : "";
    }

    // remove one ticket (jQuery slideUp); the flag stops fast repeated clicks
    $("#ticketList").on("click", ".ticket-remove", function () {
        const item = $(this).closest(".ticket-small");
        if (item.data("removing")) return;
        item.data("removing", true);

        const id = this.dataset.id;
        item.slideUp(250, function () {
            removeTicket(id, user.email);
            showTickets();
        });
    });

    // clear all: the first click asks to confirm, the second click clears
    let waiting = false;
    let timer = null;

    function resetClearButton() {
        waiting = false;
        clearBtn.textContent = "Clear all";
        clearBtn.classList.remove("is-armed");
    }

    clearBtn.addEventListener("click", function () {
        if (!waiting) {
            waiting = true;
            clearBtn.textContent = "Click again to confirm";
            clearBtn.classList.add("is-armed");
            timer = setTimeout(resetClearButton, 3000);
            return;
        }

        clearTimeout(timer);
        resetClearButton();
        $("#ticketList").stop(true, true).fadeOut(200, function () {
            clearTickets(user.email);
            showTickets();
            $("#ticketList").show();
        });
    });

    showDetails();
    showTickets();
}

// ===== START =====
const currentUser = getCurrentUser();
if (currentUser === null) {
    // nobody is logged in: go to the Log In page
    window.location.replace("login.html");
} else {
    showProfile(currentUser);
}