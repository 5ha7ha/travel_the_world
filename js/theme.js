// ===== LIGHT / DARK MODE =====
// Put <script src="js/theme.js"></script> in the <head> of EVERY page (no defer).
// It sets the saved mode before the page is drawn (no white flash), then adds the toggle button
// to the navbar. The chosen mode is saved in localStorage, so it stays after a reload and on every page.
(function () {
    const THEME_KEY = "ttwTheme";   // "light" or "dark"

    // the saved mode; if nothing is saved, use the mode of the visitor's device
    function getTheme() {
        try {
            const saved = localStorage.getItem(THEME_KEY);
            if (saved === "light" || saved === "dark") return saved;
        } catch (error) {
            // localStorage is blocked: use the device mode below
        }
        const wantsDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        return wantsDark ? "dark" : "light";
    }

    // data-theme is used by our dark.css, data-bs-theme makes Bootstrap's forms and buttons dark too
    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            // nothing to do: the mode works until the page is closed
        }
    }

    applyTheme(getTheme());

    // ===== THE TOGGLE BUTTON =====
    function updateButton(button, theme) {
        const isDark = theme === "dark";
        button.textContent = isDark ? "☀️ Light" : "🌙 Dark";
        button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        button.setAttribute("aria-pressed", String(isDark));
    }

    document.addEventListener("DOMContentLoaded", function () {
    const slot = document.querySelector(".nav-actions");
    if (slot === null) return;
    if (document.getElementById("themeToggle") !== null) return;   // already added

    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-link theme-toggle";
    button.id = "themeToggle";
    updateButton(button, getTheme());

    button.addEventListener("click", function () {
        const next = getTheme() === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
        updateButton(button, next);
    });

    slot.appendChild(button);

    // if the mode is changed in another tab, this tab follows
    window.addEventListener("storage", function (event) {
        if (event.key === THEME_KEY) {
            applyTheme(getTheme());
            updateButton(button, getTheme());
        }
    });
});
})();
