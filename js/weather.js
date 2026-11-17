// Turns the weather code from the API into an icon and a text
function describe(code) {
    if (code === 0) return ["☀️", "Clear sky"];
    if (code <= 3) return ["⛅", "Partly cloudy"];
    if (code <= 48) return ["🌫️", "Fog"];
    if (code <= 67) return ["🌧️", "Rain"];
    if (code <= 77) return ["❄️", "Snow"];
    if (code <= 82) return ["🌦️", "Showers"];
    if (code <= 86) return ["🌨️", "Snow showers"];
    return ["⛈️", "Thunderstorm"];
}

const weatherGrid = document.getElementById("weatherGrid");

// makes one text element, for example <p class="temp">--</p>
function makeLine(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
}

// builds an empty card for one country (it shows "Loading..." until the answer comes)
function buildWeatherCard(country) {
    const card = document.createElement("div");
    card.className = "weather-card";
    card.append(
        makeLine("h3", "", country.name),
        makeLine("p", "icon", "⏳"),
        makeLine("p", "temp", "--"),
        makeLine("p", "desc", "Loading..."),
        makeLine("p", "city", country.capital)
    );
    return card;
}

// asks Open-Meteo for the weather of one country and fills its card
function loadWeather(country, card) {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + country.lat +
                "&longitude=" + country.lon + "&current=temperature_2m,weather_code";

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            const info = describe(data.current.weather_code);
            card.querySelector(".icon").textContent = info[0];
            card.querySelector(".temp").textContent = Math.round(data.current.temperature_2m) + "°C";
            card.querySelector(".desc").textContent = info[1];
        })
        .catch(function () {
            card.querySelector(".icon").textContent = "⚠️";
            card.querySelector(".desc").textContent = "Weather unavailable";
        });
}

// one card for every country in data.js
countries.forEach(function (country) {
    const card = buildWeatherCard(country);
    weatherGrid.appendChild(card);
    loadWeather(country, card);
});