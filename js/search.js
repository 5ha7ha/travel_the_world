// ===== PAGE ELEMENTS =====
const searchInput = document.getElementById("searchInput");
const searchType = document.getElementById("searchType");
const searchCount = document.getElementById("searchCount");
const searchResults = document.getElementById("searchResults");

// ===== ONE LIST FOR EVERYTHING =====
// dishes and places have the same properties, so we put them in one list
// and give each item a "type" so the dropdown can filter them
const searchItems = [];

dishes.forEach(function (dish) {
    searchItems.push({ type: "Food", name: dish.name, description: dish.description, image: dish.image, country: dish.country });
});
places.forEach(function (place) {
    searchItems.push({ type: "Place", name: place.name, description: place.description, image: place.image, country: place.country });
});

// ===== HELPERS =====
// find the country object by its key, for example "spain"
function getCountry(key) {
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].key === key) {
            return countries[i];
        }
    }
    return null;
}

// does this item match the typed text and the chosen type?
function matches(item, text, type) {
    const country = getCountry(item.country);
    const allText = (item.name + " " + item.description + " " + country.name).toLowerCase();
    const textOk = allText.includes(text);
    const typeOk = type === "all" || item.type === type;
    return textOk && typeOk;
}

// ===== BUILD ONE CARD =====
function buildCard(item) {
    const country = getCountry(item.country);

    const card = document.createElement("article");
    card.className = "search-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name + " image";

    const badge = document.createElement("span");
    badge.className = "search-badge";
    badge.textContent = item.type + " · " + country.name;

    const title = document.createElement("h3");
    title.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    const link = document.createElement("a");
    link.href = country.page;
    link.textContent = "Visit " + country.name;

    card.append(img, badge, title, description, link);
    return card;
}

// ===== RUN THE SEARCH =====
function runSearch() {
    const text = searchInput.value.trim().toLowerCase();
    const type = searchType.value;

    searchResults.replaceChildren();   // remove old cards

    // nothing typed: show a hint, no cards
    if (text === "") {
        searchCount.textContent = "Type a word to start searching.";
        return;
    }

    // go through the list and keep the items that match
    const found = [];
    for (let i = 0; i < searchItems.length; i++) {
        if (matches(searchItems[i], text, type)) {
            found.push(searchItems[i]);
        }
    }

    // empty result
    if (found.length === 0) {
        searchCount.textContent = "Nothing found for \"" + searchInput.value.trim() + "\". Try another word.";
        return;
    }

    // calculated value: how many results
    searchCount.textContent = found.length + (found.length === 1 ? " result" : " results");
    found.forEach(function (item) {
        searchResults.appendChild(buildCard(item));
    });
}

// ===== EVENTS =====
searchInput.addEventListener("input", runSearch);   // every letter typed
searchType.addEventListener("change", runSearch);   // dropdown changed

runSearch();   // shows the hint when the page opens