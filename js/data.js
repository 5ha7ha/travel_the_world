// Shared content for the whole website. Pages that show country information load this file first.
// To add a country: add one object to `countries`, then its dishes and places to the other two arrays.

// ===== COUNTRIES =====
// accent, heroBg and heroGlow are the colors of that country's intro section (they become the CSS
// variables --accent, --hero-bg and --hero-glow on the page).
const countries = [
    {
        key: "yemen",
        name: "Yemen",
        capital: "Sana'a City",
        languages: ["Arabic"],
        currency: "Rial",
        population: 34,
        flag: "img/Yemen/yemenFlag.png",
        map: "img/Yemen/yemen-bg.png",
        page: "country.html?c=yemen",
        accent: "#ce1126",
        heroBg: "#1b1214",
        heroGlow: "rgba(206, 17, 38, 0.4)",
        quote: { text: "\"الحياة للشجعان! فالمؤمن القوي خيرٌ من المؤمن الضعيف\"", lang: "ar", dir: "rtl" },
        facts: [
            "Yemen is one of the first places in the world where coffee was grown. The port of Mocha even gave its name to a coffee flavor.",
            "About a third of the plants on Socotra Island grow nowhere else on Earth, including the umbrella-shaped dragon's blood tree.",
            "The Old City of Sana'a is a UNESCO World Heritage Site, famous for tall tower houses with white patterns and stained-glass windows.",
            "Aden, Yemen's port city, sits inside the crater of an extinct volcano."
        ]
    },
    {
        key: "spain",
        name: "Spain",
        capital: "Madrid",
        languages: ["Spanish"],
        currency: "Euro",
        population: 48,
        flag: "img/Spain/spainFlag.png",
        map: "img/Spain/spain_map_bg.png",
        page: "country.html?c=spain",
        accent: "#c60b1e",
        heroBg: "#2a1410",
        heroGlow: "rgba(255, 196, 0, 0.4)",
        quote: { text: "\"El que a buen árbol se arrima, buena sombra le cobija.\"", lang: "es", dir: "ltr" },
        facts: [
            "Spain produces nearly half of the world's olive oil, and most of it comes from the region of Andalusia.",
            "The Sagrada Família in Barcelona has been under construction since 1882 and is still not finished.",
            "Every August, the town of Buñol holds La Tomatina, a giant street fight where thousands of people throw tomatoes at each other.",
            "Sobrino de Botín in Madrid, opened in 1725, is recognized by Guinness World Records as the oldest restaurant in the world."
        ]
    },
    {
        key: "kazakhstan",
        name: "Kazakhstan",
        capital: "Astana",
        languages: ["Kazakh", "Russian"],
        currency: "Tenge",
        population: 20,
        flag: "img/Kazakh/Flag-Kazakhstan.webp",
        map: "img/Kazakh/Kazakhstan_Map_bg.png",
        page: "country.html?c=kazakhstan",
        accent: "#00afca",
        heroBg: "#0f2530",
        heroGlow: "rgba(255, 200, 40, 0.35)",
        quote: { text: "\"Жеті жұрттың тілін біл, жеті түрлі білім біл.\"", lang: "kk", dir: "ltr" },
        facts: [
            "Kazakhstan is the largest landlocked country in the world, bigger than all of Western Europe.",
            "The first person in space, Yuri Gagarin, was launched in 1961 from the Baikonur Cosmodrome in Kazakhstan, the world's first and largest space launch site.",
            "Scientists believe the wild apple forests near Almaty are the ancestors of the apples we eat today.",
            "The capital moved from Almaty to Astana in 1997."
        ]
    },
    {
        key: "korea",
        name: "Korea",
        capital: "Seoul",
        languages: ["Korean"],
        currency: "Won",
        population: 52,
        flag: "img/Korea/Flag_of_South_Korea.svg",
        map: "img/Korea/korea-map-bg.png",
        page: "country.html?c=korea",
        accent: "#2f19f4",
        heroBg: "#1a1413",
        heroGlow: "rgba(21, 14, 219, 0.45)",
        quote: { text: "\"너는 너대로, 나는 나대로. 그게 제일 좋은 거지.\"", lang: "ko", dir: "ltr" },
        facts: [
            "South Korea has one of the fastest average internet speeds in the world, with fiber connections reaching nearly every household.",
            "The Korean alphabet, Hangul, was created in 1443 by King Sejong the Great so that ordinary people could learn to read and write easily.",
            "Seoul's subway system is one of the longest and busiest in the world, and most trains have free Wi-Fi and phone chargers.",
            "Baduk (the board game known elsewhere as Go) has been played in Korea for over a thousand years and still has professional leagues today."
        ]
    }
];

// ===== FOOD (3 dishes for every country) =====
const dishes = [
    { country: "yemen", name: "Zurbian", description: "Spiced rice cooked with meat in one pot until everything is tender and full of flavor.", image: "img/Yemen/Zurbian.jpeg" },
    { country: "yemen", name: "Fahsa", description: "A rich stew of lamb or beef, cooked slowly until it falls apart and eaten with Yemeni flatbread.", image: "img/Yemen/Fahsa-dish.jpg" },
    { country: "yemen", name: "Braota", description: "A hearty meat dish cooked with spices, served with bread or rice.", image: "img/Yemen/Braota-dish.jpeg" },

    { country: "spain", name: "Paella", description: "Rice cooked in a wide pan with saffron, vegetables, and meats like chicken, rabbit, or seafood.", image: "img/Spain/paella.jpg" },
    { country: "spain", name: "Gazpacho", description: "A cold, refreshing soup from Andalusia made from blended ripe tomatoes, cucumbers, peppers, and olive oil.", image: "img/Spain/gazpacho.jpg" },
    { country: "spain", name: "Croquetas", description: "Small fried croquettes filled with seafood or meat, often served as an appetizer.", image: "img/Spain/croquetas.jpg" },

    { country: "kazakhstan", name: "Beshbarmak", description: "The national dish: boiled meat served over wide flat noodles with onion broth. Its name means \"five fingers\" because it is traditionally eaten by hand.", image: "img/Kazakh/beshbarmak.jpeg" },
    { country: "kazakhstan", name: "Baursak", description: "Golden puffs of fried dough, served with tea and at almost every celebration.", image: "img/Kazakh/baursak.jpeg" },
    { country: "kazakhstan", name: "Manti", description: "Large steamed dumplings filled with spiced meat and onion.", image: "img/Kazakh/manti.webp" },

    { country: "korea", name: "Bibimbap", description: "A warm rice bowl topped with mixed vegetables, chili paste (gochujang), meat, and a fried egg.", image: "img/Korea/bibimbap.jpg" },
    { country: "korea", name: "Tteokbokki", description: "Chewy cylindrical rice cakes cooked in a sweet and spicy chili sauce.", image: "img/Korea/tteokbokki.jpg" },
    { country: "korea", name: "Japchae", description: "Stir-fried glass noodles with vegetables and meat, seasoned with soy sauce and sesame oil.", image: "img/Korea/japchae.jpg" }
];

// ===== PLACES (3 places for every country) =====
const places = [
    { country: "yemen", name: "Socotra Island", description: "A remote island with dragon's blood trees, white sand beaches and wildlife seen nowhere else.", image: "img/Yemen/Sqtra.jpeg" },
    { country: "yemen", name: "Old Sana'a", description: "A walled old city of tall tower houses, narrow lanes and busy markets, one of the oldest lived-in cities in the world.", image: "img/Yemen/old-sanaa.jpg" },
    { country: "yemen", name: "Aden", description: "A port city on the Arabian Sea, built around an old volcano crater, with beaches and a historic harbor.", image: "img/Yemen/Aden.jpeg" },

    { country: "spain", name: "Barcelona", description: "Home to Gaudí's Sagrada Família, this Catalan port city mixes Gothic alleys with modernist buildings", image: "img/Spain/barcelona.jpg" },
    { country: "spain", name: "Madrid", description: "The EU's highest capital, home to the Prado Museum, Retiro Park, and a famous late-night tapas scene", image: "img/Spain/madrid.jpg" },
    { country: "spain", name: "Andalusia", description: "The birthplace of flamenco, where Moorish landmarks like the Alhambra and Córdoba's Mezquita still stand.", image: "img/Spain/andalusia.jpg" },

    { country: "kazakhstan", name: "Charyn Canyon", description: "A huge red-rock canyon more than 150 km long, often compared to the Grand Canyon. Its most famous part is called the Valley of Castles.", image: "img/Kazakh/charyn-canyon.avif" },
    { country: "kazakhstan", name: "Bayterek Tower, Astana", description: "A 97-meter tower in the capital with a golden glass sphere on top. It stands for a legendary tree of life, and you can go up for a view over the city.", image: "img/Kazakh/baterek.webp" },
    { country: "kazakhstan", name: "Big Almaty Lake", description: "A turquoise mountain lake high in the Tien Shan mountains, about 2,500 meters above sea level, close to the city of Almaty.", image: "img/Kazakh/almaty-lake.jpg" },

    { country: "korea", name: "Seoul", description: "The capital of South Korea, known for its vibrant culture, historic palaces, and modern skyline.", image: "img/Korea/seoul.jpg" },
    { country: "korea", name: "Busan", description: "The second-largest city in South Korea, known for its beautiful beaches, vibrant nightlife, and the Gukje Market.", image: "img/Korea/busan.jpg" },
    { country: "korea", name: "Jeju", description: "An island province known for its natural beauty, including volcanic landscapes, cherry blossoms, and unique culture.", image: "img/Korea/jeju.jpg" }
];
