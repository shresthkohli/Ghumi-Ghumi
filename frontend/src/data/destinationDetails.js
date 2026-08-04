// Seed data for the destination DETAIL page (/destinations/:id)

const destinationDetails = [
    {
        id: "1",
        name: "Jaipur",
        city: "Jaipur",
        country: "India",
        tagline: "The Pink City's Royal Legacy",
        description:
        "Wander sandstone forts, mirrored palaces, and bazaars soaked in the color that gives this city its name.",
        image_url: "https://picsum.photos/seed/jaipur-hero/1600/900",
        category: "Heritage",
        best_time_to_visit: "October to March",
        weather: "Warm, dry days and cool evenings in winter",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.8,
        review_count: 1920,
        budget_category: "Mid-range",
        price_from: 620,
        highlights: [
        {
            icon: "castle",
            title: "Amber Fort",
            description: "Climb the hilltop ramparts of a fort built from honey-gold sandstone.",
        },
        {
            icon: "storefront",
            title: "Johari Bazaar",
            description: "Browse lanes of gemstones, block-printed textiles, and hand-forged jewelry.",
        },
        {
            icon: "palette",
            title: "Hawa Mahal",
            description: "See the city's famous honeycomb facade of 953 sandstone windows up close.",
        },
        ],
        story_title: "A City Painted in Legacy",
        story_text:
        "Jaipur was planned in 1727 as a single, deliberate act of vision — a grid of rose-hued streets laid out by a warrior-astronomer king. That intention still shows. Every archway and courtyard feels composed rather than accumulated, from the mirrored halls of the City Palace to the geometry of the Jantar Mantar observatory next door.",
        story_image: "https://picsum.photos/seed/jaipur-story/900/700",
        story_image_caption: "Local Craft",
        perks: [
        { icon: "auto_awesome", label: "Private Palace Tour" },
        { icon: "directions_car", label: "Premium Airport Transfers" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
    {
        id: "2",
        name: "Goa",
        city: "Panaji",
        country: "India",
        tagline: "Sun, Surf, and Portuguese Soul",
        description:
        "Palm-lined beaches by day, whitewashed churches and night markets by evening — Goa moves at its own tide.",
        image_url: "https://picsum.photos/seed/goa-hero/1600/900",
        category: "Beach",
        best_time_to_visit: "November to February",
        weather: "Tropical and humid, coolest in winter months",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.6,
        review_count: 3140,
        budget_category: "Budget-friendly",
        price_from: 410,
        highlights: [
        {
            icon: "beach_access",
            title: "Palolem Beach",
            description: "Settle into a crescent bay lined with palm-thatched shacks and calm water.",
        },
        {
            icon: "church",
            title: "Old Goa Churches",
            description: "Step inside baroque cathedrals that trace four centuries of Portuguese rule.",
        },
        {
            icon: "nightlife",
            title: "Anjuna Night Market",
            description: "Shop handmade leather, silver, and spice stalls as the sun goes down.",
        },
        ],
        story_title: "Where Two Coastlines Meet",
        story_text:
        "Goa carries two histories at once — the fishing villages of the Konkan coast, and the Portuguese churches, azulejo tiles, and family bakeries left behind after 450 years of colonial rule. The result is a state that feels unlike anywhere else in India: siesta-paced afternoons, spice-forward Goan curries, and beaches that shift character from lazy to lively within a few kilometers.",
        story_image: "https://picsum.photos/seed/goa-story/900/700",
        story_image_caption: "Coastal Life",
        perks: [
        { icon: "auto_awesome", label: "Sunset Cruise Invitation" },
        { icon: "directions_car", label: "Scooter Rental Included" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
    {
        id: "3",
        name: "Kerala",
        city: "Alleppey",
        country: "India",
        tagline: "God's Own Country",
        description:
        "Drift through emerald backwaters on a houseboat and wake to the smell of cardamom and rain.",
        image_url: "https://picsum.photos/seed/kerala-hero/1600/900",
        category: "Nature",
        best_time_to_visit: "September to March",
        weather: "Humid tropical, with a monsoon season June to August",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.9,
        review_count: 2260,
        budget_category: "Mid-range",
        price_from: 560,
        highlights: [
        {
            icon: "directions_boat",
            title: "Backwater Houseboat",
            description: "Sleep aboard a converted rice barge as it glides through still canals.",
        },
        {
            icon: "forest",
            title: "Munnar Tea Hills",
            description: "Walk terraced tea plantations rolling into misty highland valleys.",
        },
        {
            icon: "spa",
            title: "Ayurvedic Retreat",
            description: "Unwind with traditional oil massage and herbal treatments by the coast.",
        },
        ],
        story_title: "A Slower Kind of Green",
        story_text:
        "Kerala's backwaters are a working landscape as much as a scenic one — coconut groves, rice paddies, and fishing villages threaded together by more than 900 kilometers of interlinked canals and lagoons. Life here still runs on the water: school boats, vegetable vendors, and the low hum of a houseboat's engine at dusk.",
        story_image: "https://picsum.photos/seed/kerala-story/900/700",
        story_image_caption: "Backwater Living",
        perks: [
        { icon: "auto_awesome", label: "Private Houseboat Upgrade" },
        { icon: "directions_car", label: "Premium Airport Transfers" },
        { icon: "spa", label: "Ayurvedic Welcome Ritual" },
        ],
    },
    {
        id: "4",
        name: "Varanasi",
        city: "Varanasi",
        country: "India",
        tagline: "The Eternal City on the Ganges",
        description:
        "Watch dawn break over the ghats in one of the oldest continuously inhabited cities on earth.",
        image_url: "https://picsum.photos/seed/varanasi-hero/1600/900",
        category: "Spiritual",
        best_time_to_visit: "October to March",
        weather: "Mild winters, very hot summers",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.7,
        review_count: 1580,
        budget_category: "Budget-friendly",
        price_from: 380,
        highlights: [
        {
            icon: "self_improvement",
            title: "Ganga Aarti",
            description: "Watch the nightly fire ritual light up Dashashwamedh Ghat.",
        },
        {
            icon: "directions_boat",
            title: "Sunrise Boat Ride",
            description: "Drift past dozens of stone ghats as the city wakes along the river.",
        },
        {
            icon: "temple_hindu",
            title: "Kashi Vishwanath Temple",
            description: "Visit one of the twelve most sacred Shiva shrines in India.",
        },
        ],
        story_title: "A City Older Than Memory",
        story_text:
        "Varanasi has stood on the banks of the Ganges for over 3,000 years, and it wears that age openly — narrow lanes that predate maps, ghats worn smooth by centuries of pilgrims, and a rhythm of ritual that hasn't paused for a single sunrise. To sit by the river here is to watch a living tradition, not a preserved one.",
        story_image: "https://picsum.photos/seed/varanasi-story/900/700",
        story_image_caption: "Riverside Ritual",
        perks: [
        { icon: "auto_awesome", label: "Private Aarti Viewing Boat" },
        { icon: "directions_car", label: "Premium Airport Transfers" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
    {
        id: "5",
        name: "Agra",
        city: "Agra",
        country: "India",
        tagline: "A Monument to Eternal Love",
        description:
        "Stand before the Taj Mahal at sunrise, when the white marble turns soft shades of pink and gold.",
        image_url: "https://picsum.photos/seed/agra-hero/1600/900",
        category: "Heritage",
        best_time_to_visit: "October to March",
        weather: "Mild winters, extremely hot summers",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.9,
        review_count: 4210,
        budget_category: "Mid-range",
        price_from: 540,
        highlights: [
        {
            icon: "auto_awesome",
            title: "Taj Mahal at Dawn",
            description: "Enter before the crowds, when the marble catches the first light.",
        },
        {
            icon: "castle",
            title: "Agra Fort",
            description: "Explore the red sandstone fortress that once housed the Mughal court.",
        },
        {
            icon: "restaurant_menu",
            title: "Mughlai Dining",
            description: "Taste slow-cooked kebabs and biryani rooted in imperial kitchens.",
        },
        ],
        story_title: "Marble and Memory",
        story_text:
        "Commissioned in 1632 by an emperor mourning his wife, the Taj Mahal took over 20,000 artisans and two decades to complete. What's easy to miss from photographs is how the building changes through the day — ivory at dawn, blinding white at noon, rose-gold at dusk — a monument designed to be watched, not just seen once.",
        story_image: "https://picsum.photos/seed/agra-story/900/700",
        story_image_caption: "Mughal Craft",
        perks: [
        { icon: "auto_awesome", label: "Sunrise Skip-the-Line Entry" },
        { icon: "directions_car", label: "Premium Airport Transfers" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
    {
        id: "6",
        name: "Udaipur",
        city: "Udaipur",
        country: "India",
        tagline: "The City of Lakes",
        description:
        "Marble palaces float on still water in a city built for royalty and never quite let go of it.",
        image_url: "https://picsum.photos/seed/udaipur-hero/1600/900",
        category: "Heritage",
        best_time_to_visit: "September to March",
        weather: "Warm, dry days with cool winter evenings",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.8,
        review_count: 1740,
        budget_category: "Luxury",
        price_from: 890,
        highlights: [
        {
            icon: "water",
            title: "Lake Pichola",
            description: "Take a sunset boat ride past the floating City Palace and Jag Mandir.",
        },
        {
            icon: "castle",
            title: "City Palace Complex",
            description: "Wander a maze of courtyards, mosaics, and mirrored halls above the lake.",
        },
        {
            icon: "photo_camera",
            title: "Old City Rooftops",
            description: "Find a rooftop café for golden-hour views over whitewashed havelis.",
        },
        ],
        story_title: "A City Built to Overlook Water",
        story_text:
        "Founded in 1559, Udaipur was designed around its lakes from the start — palaces positioned for reflection, ghats built for ceremony, gardens laid out to be seen from the water. It's the rare Rajasthani city that feels soft rather than fortified, all pale stone and blue lake against the surrounding Aravalli hills.",
        story_image: "https://picsum.photos/seed/udaipur-story/900/700",
        story_image_caption: "Lakeside Heritage",
        perks: [
        { icon: "auto_awesome", label: "Private Lake Boat Charter" },
        { icon: "directions_car", label: "Premium Airport Transfers" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
    {
        id: "7",
        name: "Rishikesh",
        city: "Rishikesh",
        country: "India",
        tagline: "Yoga Capital of the World",
        description:
        "Meditate by the Ganges in the foothills of the Himalayas, where the river runs turquoise and cold.",
        image_url: "https://picsum.photos/seed/rishikesh-hero/1600/900",
        category: "Spiritual",
        best_time_to_visit: "February to April, September to November",
        weather: "Mild in the foothills, cold in winter",
        entry_requirements: "Valid passport and e-Visa for most nationalities",
        avg_rating: 4.7,
        review_count: 1330,
        budget_category: "Budget-friendly",
        price_from: 350,
        highlights: [
        {
            icon: "self_improvement",
            title: "Sunrise Yoga",
            description: "Join a riverside session as the Himalayan foothills catch first light.",
        },
        {
            icon: "kayaking",
            title: "White-Water Rafting",
            description: "Run rapids on the Ganges through pine-covered gorges.",
        },
        {
            icon: "temple_hindu",
            title: "Laxman Jhula",
            description: "Cross the iron suspension bridge into a town of temples and chai stalls.",
        },
        ],
        story_title: "Where the Mountains Meet the River",
        story_text:
        "Rishikesh sits at the point where the Ganges leaves the Himalayas and enters the plains, and that in-between geography shapes everything about it. Ashrams line the riverbank alongside rafting outfitters and rooftop cafés — a town that's been a pilgrimage stop for millennia and a magnet for anyone chasing quiet since the Beatles visited in 1968.",
        story_image: "https://picsum.photos/seed/rishikesh-story/900/700",
        story_image_caption: "Riverside Practice",
        perks: [
        { icon: "auto_awesome", label: "Private Meditation Session" },
        { icon: "directions_car", label: "Premium Airport Transfers" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
    {
        id: "8",
        name: "Ladakh",
        city: "Leh",
        country: "India",
        tagline: "High-Altitude Desert Kingdom",
        description:
        "Cross Himalayan passes into a moonscape of monasteries, glacial lakes, and thin, brilliant air.",
        image_url: "https://picsum.photos/seed/ladakh-hero/1600/900",
        category: "Adventure",
        best_time_to_visit: "May to September",
        weather: "Cold and arid; snowbound in winter",
        entry_requirements: "Valid passport, e-Visa, and Inner Line Permit for some areas",
        avg_rating: 4.9,
        review_count: 980,
        budget_category: "Mid-range",
        price_from: 720,
        highlights: [
        {
            icon: "landscape",
            title: "Pangong Lake",
            description: "See a glacial lake shift through shades of blue at over 4,200 meters.",
        },
        {
            icon: "temple_buddhist",
            title: "Thiksey Monastery",
            description: "Visit a cliffside gompa that echoes with morning prayer chants.",
        },
        {
            icon: "directions_bike",
            title: "Khardung La Pass",
            description: "Ride one of the highest motorable roads in the world.",
        },
        ],
        story_title: "A Desert Above the Clouds",
        story_text:
        "Ladakh sits in the rain shadow of the Himalayas, a high-altitude desert where Buddhist monasteries cling to cliffs and villages irrigate barley fields with glacial meltwater. The scale is disorienting in the best way — passes over 5,000 meters, lakes that change color by the hour, and a silence that mountain places this remote still manage to keep.",
        story_image: "https://picsum.photos/seed/ladakh-story/900/700",
        story_image_caption: "Mountain Tradition",
        perks: [
        { icon: "auto_awesome", label: "Private Monastery Visit" },
        { icon: "directions_car", label: "Altitude-Ready Transfers" },
        { icon: "spa", label: "24/7 Concierge Support" },
        ],
    },
];

// Returns every destination detail record 
// not used here but can be used later
export function getDestinationDetailsList() {
  return destinationDetails;
}

// Returns one destination by id, or undefined if it doesn't exist.
export function getDestinationById(id) {
  return destinationDetails.find((destination) => destination.id === id);
}