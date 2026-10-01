// Turns the weather code from the API into an icon and a text
function describe(code) {
    if (code === 0) return ["☀️", "Clear sky"];
    if (code <= 3) return ["⛅", "Partly cloudy"];
    if (code <= 48) return ["🌫️", "Fog"];
    if (code <= 67) return ["🌧️", "Rain"];
    if (code <= 77) return ["❄️", "Snow"];
    if (code <= 82) return ["🌦️", "Showers"];
    return ["⛈️", "Thunderstorm"];
}

const cards = document.querySelectorAll(".weather-card");

cards.forEach(function (card) {
    const lat = card.dataset.lat;
    const lon = card.dataset.lon;

    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
                "&longitude=" + lon + "&current=temperature_2m,weather_code";

    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            const temp = Math.round(data.current.temperature_2m);
            const info = describe(data.current.weather_code);

            card.querySelector(".icon").textContent = info[0];
            card.querySelector(".temp").textContent = temp + "°C";
            card.querySelector(".desc").textContent = info[1];
        })
        .catch(function () {
            card.querySelector(".desc").textContent = "Weather unavailable";
        });
});