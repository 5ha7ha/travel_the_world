// One page for every country: country.html?c=korea shows Korea, country.html?c=spain shows Spain.
// The content comes from js/data.js and is built here with jQuery.


// ===== HELPERS =====
// find a country by its key, returns null when there is no such country
function findCountry(key) {
    const found = $.grep(countries, function (country) {
        return country.key === key;
    });
    return found.length > 0 ? found[0] : null;
}

// keep only the items (dishes or places) of one country
function itemsFor(list, key) {
    return $.grep(list, function (item) {
        return item.country === key;
    });
}

// a round flag with the country name, used in the picker and in "Visit another country"
function buildFlagLink(country) {
    return $("<a>", { href: country.page, "class": "flag-link" })
        .append($("<img>", { src: country.flag, alt: "Flag of " + country.name }))
        .append($("<span>").text(country.name));
}

// ===== BUILD THE SECTIONS =====
function renderFacts(country) {
    const list = $("#factsList").empty();
    $.each(country.facts, function (index, fact) {
        $("<li>").text(fact).appendTo(list);
    });
}

// same markup as the old pages: <div class="food-item"><figure class="arch"><img></figure><div><h3><p></div></div>
function renderDishes(items) {
    const row = $("#foodList").empty();

    if (items.length === 0) {
        row.text("No dishes yet.");
        return;
    }

    $.each(items, function (index, dish) {
        const figure = $("<figure>", { "class": "arch" })
            .append($("<img>", { src: dish.image, alt: "Dish " + dish.name }));
        const text = $("<div>")
            .append($("<h3>").text(dish.name))
            .append($("<p>").text(dish.description));

        $("<div>", { "class": "food-item" }).append(figure, text).appendTo(row);
    });
}

// same markup as the old pages: <div class="visit-card"><img><h3><p></div>
function renderPlaces(items) {
    const grid = $("#placesList").empty();

    if (items.length === 0) {
        grid.text("No places yet.");
        return;
    }

    $.each(items, function (index, place) {
        $("<div>", { "class": "visit-card" })
            .append($("<img>", { src: place.image, alt: place.name + " image" }))
            .append($("<h3>").text(place.name))
            .append($("<p>").text(place.description))
            .appendTo(grid);
    });
}

function renderOtherCountries(current) {
    const row = $("#otherFlags").empty();
    $.each(countries, function (index, country) {
        if (country.key !== current.key) {
            row.append(buildFlagLink(country));
        }
    });
}

// ===== SHOW ONE COUNTRY =====
function showCountry(country) {
    // colors of this country (the old pages set the same variables on <body>)
    $("body").addClass(country.key).css({
        "--accent": country.accent,
        "--hero-bg": country.heroBg,
        "--hero-glow": country.heroGlow
    });
    document.title = country.name + " | Travel the World";

    // intro: map behind, flag, four values, quote
    $("#countryMap").attr({ src: country.map, alt: country.name + " map" });
    $("#countryFlag").attr({ src: country.flag, alt: "Flag of " + country.name });

    $("#infoCountry").text(country.name);
    $("#infoCapital").text(country.capital);
    $("#infoLanguageLabel").text(country.languages.length > 1 ? "Languages" : "Language");
    $("#infoLanguage").text(country.languages.join(" / "));
    $("#infoCurrency").text(country.currency);

    // lang and dir make Arabic read right to left and help screen readers
    $("#quoteText").text(country.quote.text).attr({ lang: country.quote.lang, dir: country.quote.dir });

    // content from the arrays
    renderFacts(country);
    renderDishes(itemsFor(dishes, country.key));
    renderPlaces(itemsFor(places, country.key));
    renderOtherCountries(country);

    $("#planLink")
        .attr("href", "plan.html?c=" + country.key)
        .text("Plan a trip to " + country.name);

    $("#countryContent").prop("hidden", false);
    $("#picker").prop("hidden", true);

    // jQuery effects: facts slide in one by one, then dishes and places fade in one by one
    $(".facts-list li").hide().each(function (index) {
        $(this).delay(index * 150).slideDown(300);
    });
    $(".food-item, .visit-card").hide().each(function (index) {
        $(this).delay(index * 120).fadeIn(400);
    });
}

// no country in the address, or a wrong one: let the visitor pick a flag
function showPicker(wrongKey) {
    if (wrongKey !== null && wrongKey !== "") {
        $("#pickerMessage").text("We do not have a page for \"" + wrongKey + "\" yet. Pick one of these countries:");
    } else {
        $("#pickerMessage").text("Pick a flag to start your trip.");
    }

    const row = $("#pickerFlags").empty();
    $.each(countries, function (index, country) {
        row.append(buildFlagLink(country));
    });

    document.title = "Choose a country | Travel the World";
    $("#picker").prop("hidden", false);
    $("#countryContent").prop("hidden", true);
}

// ===== START =====
$(function () {
    const selectedKey = new URLSearchParams(window.location.search).get("c");
    const selectedCountry = findCountry(selectedKey);

    if (selectedCountry !== null) {
        showCountry(selectedCountry);
    } else {
        showPicker(selectedKey);
    }
});
