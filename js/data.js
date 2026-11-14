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
    },
        {
        key: "japan",
        name: "Japan",
        capital: "Tokyo",
        languages: ["Japanese"],
        currency: "Yen",
        population: 124,
        flag: "img/Japan/japanFlag.webp",
        map: "img/Japan/japan-map-bg.svg",
        page: "country.html?c=japan",
        accent: "#bc002d",
        heroBg: "#1a1214",
        heroGlow: "rgba(188, 0, 45, 0.4)",
        quote: { text: "\"七転び八起き\"", lang: "ja", dir: "ltr" },
        facts: [
            "Japan is made up of more than 14,000 islands, but most people live on just four main ones: Honshu, Hokkaido, Kyushu and Shikoku.",
            "The Shinkansen bullet train started running in 1964 and is famous for being punctual, with average delays of under a minute.",
            "Kyoto was the capital of Japan for over a thousand years, until the capital moved to Tokyo in 1868.",
            "Japan has millions of vending machines, selling everything from hot coffee to umbrellas."
        ]
    },
    {
        key: "germany",
        name: "Germany",
        capital: "Berlin",
        languages: ["German"],
        currency: "Euro",
        population: 84,
        flag: "img/Germany/germanyFlag.webp",
        map: "img/Germany/germany-map-bg.svg",
        page: "country.html?c=germany",
        accent: "#ffce00",
        heroBg: "#14161a",
        heroGlow: "rgba(255, 206, 0, 0.35)",
        quote: { text: "\"Aller Anfang ist schwer.\"", lang: "de", dir: "ltr" },
        facts: [
            "Parts of the German Autobahn have no general speed limit, which makes it one of the most famous road networks in the world.",
            "Johannes Gutenberg invented the movable-type printing press in Mainz around 1440, which changed how books were made across Europe.",
            "The Berlin Wall divided the city for 28 years and fell on November 9, 1989.",
            "The tradition of the Christmas tree started in Germany, and its Christmas markets are famous worldwide."
        ]
    },
    {
        key: "usa",
        name: "United States",
        capital: "Washington, D.C.",
        languages: ["English"],
        currency: "US Dollar",
        population: 340,
        flag: "img/USA/usaFlag.webp",
        map: "img/USA/usa-map-bg.svg",
        page: "country.html?c=usa",
        accent: "#b22234",
        heroBg: "#121826",
        heroGlow: "rgba(60, 59, 110, 0.5)",
        quote: { text: "\"Where there's a will, there's a way.\"", lang: "en", dir: "ltr" },
        facts: [
            "Yellowstone, created in 1872, was the first national park in the world.",
            "The Statue of Liberty was a gift from France and was dedicated in New York Harbor in 1886.",
            "The Wright brothers made the first powered airplane flight in 1903 at Kitty Hawk, North Carolina.",
            "In 1969, the Apollo 11 mission launched from Florida and put the first humans on the Moon."
        ]
    },
    {
        key: "canada",
        name: "Canada",
        capital: "Ottawa",
        languages: ["English", "French"],
        currency: "Canadian Dollar",
        population: 41,
        flag: "img/Canada/canadaFlag.png",
        map: "img/Canada/canada-map-bg.webp",
        page: "country.html?c=canada",
        accent: "#d52b1e",
        heroBg: "#1a1212",
        heroGlow: "rgba(213, 43, 30, 0.4)",
        quote: { text: "\"Petit à petit, l'oiseau fait son nid.\"", lang: "fr", dir: "ltr" },
        facts: [
            "Canada is the second-largest country in the world by area and has the longest coastline of any country.",
            "Canada has more lakes than the rest of the world combined.",
            "Most of the world's maple syrup comes from Canada, and the vast majority of it is made in Quebec.",
            "In winter, the Rideau Canal in Ottawa turns into one of the largest naturally frozen skating rinks in the world."
        ]
    },
        {
        key: "russia",
        name: "Russia",
        capital: "Moscow",
        languages: ["Russian"],
        currency: "Ruble",
        population: 144,
        flag: "img/Russia/russiaFlag.webp",
        map: "img/Russia/russia-map-bg.svg",
        page: "country.html?c=russia",
        accent: "#0039a6",
        heroBg: "#12151f",
        heroGlow: "rgba(213, 43, 30, 0.4)",
        quote: { text: "\"Без труда не вытащишь и рыбку из пруда.\"", lang: "ru", dir: "ltr" },
        facts: [
            "Russia is the largest country in the world and spans 11 time zones, so when people in Kaliningrad are having breakfast, people in Kamchatka are already finishing their day.",
            "Lake Baikal in Siberia is the deepest lake on Earth, at about 1,640 meters, and holds around a fifth of the world's unfrozen fresh water.",
            "The Trans-Siberian Railway is about 9,300 km long, the longest railway line in the world, and the full trip from Moscow to Vladivostok takes about a week.",
            "The Soviet Union launched Sputnik 1 in 1957, the first artificial satellite to orbit the Earth."
        ]
    },
    {
        key: "brazil",
        name: "Brazil",
        capital: "Brasília",
        languages: ["Portuguese"],
        currency: "Real",
        population: 212,
        flag: "img/Brazil/brazilFlag.webp",
        map: "img/Brazil/brazil-map-bg.svg",
        page: "country.html?c=brazil",
        accent: "#009c3b",
        heroBg: "#0f1a14",
        heroGlow: "rgba(255, 223, 0, 0.35)",
        quote: { text: "\"Água mole em pedra dura, tanto bate até que fura.\"", lang: "pt", dir: "ltr" },
        facts: [
            "Brazil is home to about 60% of the Amazon rainforest, the largest tropical rainforest on Earth.",
            "Brazil has won the FIFA World Cup five times, more than any other country.",
            "Brasília, the capital, was built from scratch in the late 1950s and inaugurated in 1960 to move the country's center away from the coast.",
            "Brazil is the largest Portuguese-speaking country in the world, and the Rio Carnival is one of the biggest festivals on the planet."
        ]
    },
    {
        key: "saudi",
        name: "Saudi Arabia",
        capital: "Riyadh",
        languages: ["Arabic"],
        currency: "Riyal",
        population: 35,
        flag: "img/Saudi/saudiFlag.webp",
        map: "img/Saudi/saudi-map-bg.svg",
        page: "country.html?c=saudi",
        accent: "#006c35",
        heroBg: "#101a14",
        heroGlow: "rgba(0, 108, 53, 0.45)",
        quote: { text: "\"من جدّ وجد، ومن زرع حصد\"", lang: "ar", dir: "rtl" },
        facts: [
            "Saudi Arabia is home to Makkah and Madinah, the two holiest cities in Islam, and millions of pilgrims visit them every year.",
            "The country has no permanent rivers, and much of its drinking water comes from desalination plants on the coast.",
            "The Empty Quarter (Rub' al Khali) is one of the largest continuous sand deserts in the world and stretches across the south of the country.",
            "Hegra in AlUla, with its tombs carved into rock, was the first place in Saudi Arabia to become a UNESCO World Heritage Site, in 2008."
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
    { country: "korea", name: "Japchae", description: "Stir-fried glass noodles with vegetables and meat, seasoned with soy sauce and sesame oil.", image: "img/Korea/japchae.jpg" },

    { country: "japan", name: "Sushi", description: "Vinegared rice paired with fresh fish, seafood or vegetables, served as bite-sized pieces or rolls.", image: "img/Japan/sushi.jpg" },
    { country: "japan", name: "Ramen", description: "Wheat noodles in a rich broth, topped with sliced pork, a soft egg and green onions.", image: "img/Japan/ramen.webp" },
    { country: "japan", name: "Takoyaki", description: "Crispy round balls of batter with a piece of octopus inside, topped with sauce and bonito flakes.", image: "img/Japan/takoyaki.jpg" },

    { country: "germany", name: "Bratwurst", description: "A grilled pork sausage, often eaten in a bread roll with mustard or served with sauerkraut.", image: "img/Germany/bratwurst.jpg" },
    { country: "germany", name: "Schnitzel", description: "A thin cutlet of meat, breaded and fried until golden, usually served with potatoes and a slice of lemon.", image: "img/Germany/schnitzel.webp" },
    { country: "germany", name: "Pretzel", description: "A twisted baked bread with a dark crust and coarse salt, a classic snack in Bavaria.", image: "img/Germany/pretzel.jpg" },

    { country: "usa", name: "Hamburger", description: "A grilled beef patty in a soft bun with lettuce, tomato, cheese and sauces, one of the most iconic American foods.", image: "img/USA/hamburger.webp" },
    { country: "usa", name: "Buffalo Wings", description: "Fried chicken wings coated in a spicy, tangy sauce and served with celery and a creamy dip.", image: "img/USA/buffalo-wing.jpg" },
    { country: "usa", name: "Apple Pie", description: "A sweet baked pie with a flaky crust and a cinnamon-spiced apple filling, often served warm.", image: "img/USA/apple-pie.jpg" },

    { country: "canada", name: "Poutine", description: "French fries topped with cheese curds and hot gravy, a famous dish from Quebec.", image: "img/Canada/poutine.webp" },
    { country: "canada", name: "Tourtière", description: "A savory meat pie with spiced pork or beef, traditionally eaten at Christmas in Quebec.", image: "img/Canada/tourtiere.jpg" },
    { country: "canada", name: "Nanaimo Bars", description: "A no-bake dessert with a chocolate and coconut base, custard cream in the middle and chocolate on top.", image: "img/Canada/nanaimo-bars.webp" },

    { country: "russia", name: "Borscht", description: "A bright red beetroot soup with cabbage, potatoes and meat, usually served with sour cream.", image: "img/Russia/borscht.jpg" },
    { country: "russia", name: "Pelmeni", description: "Small dumplings filled with minced meat, boiled and eaten with butter, vinegar or sour cream.", image: "img/Russia/pelmeni.jpg" },
    { country: "russia", name: "Blini", description: "Thin, soft pancakes served with jam, honey, sour cream or caviar, especially during Maslenitsa.", image: "img/Russia/blini.jpg" },

    { country: "brazil", name: "Feijoada", description: "A rich stew of black beans and pork, served with rice, collard greens and orange slices. It is often called the national dish.", image: "img/Brazil/feijoada.jpg" },
    { country: "brazil", name: "Pão de Queijo", description: "Small, chewy cheese breads made with tapioca flour, popular for breakfast and snacks.", image: "img/Brazil/pao-de-queijo.jpg" },
    { country: "brazil", name: "Brigadeiro", description: "A chocolate truffle made from condensed milk and cocoa, rolled in sprinkles, found at every birthday party.", image: "img/Brazil/brigadeiro.jpg" },

    { country: "saudi", name: "Kabsa", description: "The most famous dish of the country: spiced rice cooked with chicken or lamb, often topped with nuts and raisins.", image: "img/Saudi/kabsa.jpg" },
    { country: "saudi", name: "Mutabbaq", description: "A stuffed, folded pan-fried pastry filled with minced meat, egg and spices, a popular street food.", image: "img/Saudi/mutabbaq.jpg" },
    { country: "saudi", name: "Jareesh", description: "A creamy dish of crushed wheat cooked with meat or chicken and spices, eaten especially in the Najd region.", image: "img/Saudi/jareesh.avif" }
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
    { country: "korea", name: "Jeju", description: "An island province known for its natural beauty, including volcanic landscapes, cherry blossoms, and unique culture.", image: "img/Korea/jeju.jpg" },

    { country: "japan", name: "Tokyo", description: "A huge capital where neon-lit streets, quiet shrines, anime culture and some of the world's best food sit side by side.", image: "img/Japan/tokyo.webp" },
    { country: "japan", name: "Kyoto", description: "The old imperial capital, known for its thousands of temples, wooden teahouses and the red gates of Fushimi Inari.", image: "img/Japan/kyoto.jpg" },
    { country: "japan", name: "Mount Fuji", description: "Japan's highest mountain at 3,776 meters, a sacred symbol of the country that you can climb in summer.", image: "img/Japan/mount-fuji.jpg" },

    { country: "germany", name: "Neuschwanstein Castle", description: "A fairy-tale castle on a hill in the Bavarian Alps, built in the 19th century by King Ludwig II.", image: "img/Germany/neuschwanstein.jpg" },
    { country: "germany", name: "Berlin", description: "The capital, where you can see the Brandenburg Gate, remains of the Berlin Wall and Museum Island.", image: "img/Germany/berlin.jpg" },
    { country: "germany", name: "Black Forest", description: "A large, dark forested mountain region in the southwest, known for hiking trails, lakes and small villages.", image: "img/Germany/black-forest.jpg" },

    { country: "usa", name: "New York City", description: "The city of skyscrapers, Times Square, Central Park and the Statue of Liberty.", image: "img/USA/new-york.webp" },
    { country: "usa", name: "Grand Canyon", description: "A giant canyon in Arizona carved by the Colorado River, about 446 km long and up to 1.8 km deep.", image: "img/USA/grand-canyon.jpg" },
    { country: "usa", name: "Yellowstone", description: "The world's first national park, famous for the Old Faithful geyser, hot springs, bison and bears.", image: "img/USA/yellowstone.webp" },

    { country: "canada", name: "Banff National Park", description: "Canada's oldest national park in the Rocky Mountains, with turquoise lakes like Lake Louise and Moraine Lake.", image: "img/Canada/banff.jpg" },
    { country: "canada", name: "Niagara Falls", description: "A group of huge waterfalls on the border with the USA, where you can take a boat right up to the mist.", image: "img/Canada/niagara-falls.webp" },
    { country: "canada", name: "Quebec City", description: "A walled city with cobblestone streets and the Château Frontenac, which feels like a small piece of Europe.", image: "img/Canada/quebec-city.webp" },

    { country: "russia", name: "Red Square, Moscow", description: "The famous square in the center of Moscow, with the colorful domes of Saint Basil's Cathedral and the walls of the Kremlin.", image: "img/Russia/red-square.jpg" },
    { country: "russia", name: "Saint Petersburg", description: "A city of canals, white nights and palaces, home to the Hermitage Museum, one of the largest art museums in the world.", image: "img/Russia/saint-petersburg.jpg" },
    { country: "russia", name: "Lake Baikal", description: "The deepest and one of the oldest lakes on Earth, with crystal-clear water that freezes into transparent ice in winter.", image: "img/Russia/lake-baikal.jpeg" },

    { country: "brazil", name: "Rio de Janeiro", description: "A coastal city famous for Copacabana beach, Sugarloaf Mountain and the Christ the Redeemer statue.", image: "img/Brazil/rio.jpg" },
    { country: "brazil", name: "Iguazu Falls", description: "A huge system of about 275 waterfalls on the border with Argentina, surrounded by rainforest.", image: "img/Brazil/iguazu-falls.jpg" },
    { country: "brazil", name: "Amazon Rainforest", description: "The largest tropical rainforest in the world, home to millions of species of plants and animals and the mighty Amazon River.", image: "img/Brazil/amazon.webp" },

    { country: "saudi", name: "AlUla", description: "A desert valley with sandstone cliffs and Hegra, an ancient Nabataean city with tombs carved into the rock.", image: "img/Saudi/alula.avif" },
    { country: "saudi", name: "Makkah", description: "The holiest city in Islam, home to the Kaaba inside Masjid al-Haram. Millions of Muslims travel here every year for Hajj and Umrah.", image: "img/Saudi/makkah.jpg" },
    { country: "saudi", name: "Edge of the World", description: "A dramatic cliff edge near Riyadh, part of the Tuwaiq Escarpment, with views over a vast plain that seems to have no end.", image: "img/Saudi/edge-of-the-world.jpg" }
];
