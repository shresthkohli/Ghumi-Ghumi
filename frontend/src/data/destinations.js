const destinations = [
    {
        id: 1,
        name: "Jaipur",
        city: "Jaipur",
        country: "India",
        description: "Famous for its rich history, majestic palaces, forts, vibrant bazaars, and authentic Rajasthani culture. Jaipur offers a royal experience with breathtaking architecture and delicious local cuisine.",
        imageUrl: "../data/images/destinations/jaipur.avif",
        category: "heritage",
        bestTimeToVisit: "October to March",
        weather: "Pleasant winters with warm sunny days. Summers can be extremely hot.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "mid-range"
    },

    {
        id: 2,
        name: "Goa",
        city: "Panaji",
        country: "India",
        description: "India's most popular beach destination, known for its Portuguese heritage, lively nightlife, delicious seafood, and pristine beaches along the Arabian Sea.",
        imageUrl: "../data/images/destinations/goa.avif",
        category: "beach",
        bestTimeToVisit: "November to February",
        weather: "Warm tropical climate throughout the year with pleasant winters.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.7,
        budgetCategory: "mid-range"
    },

    {
        id: 3,
        name: "Ladakh",
        city: "Leh",
        country: "India",
        description: "A breathtaking high-altitude desert known for dramatic mountains, serene monasteries, crystal-clear lakes, and thrilling adventures like trekking and motorbiking.",
        imageUrl: "/images/destinations/ladakh.avif",
        category: "adventure",
        bestTimeToVisit: "May to September",
        weather: "Cool summers and freezing winters with low rainfall.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport, visa, and may require Inner Line Permits for certain regions.",
        averageRating: 4.9,
        budgetCategory: "luxury"
    },

    {
        id: 4,
        name: "Munnar",
        city: "Munnar",
        country: "India",
        description: "A peaceful hill station famous for lush tea plantations, misty hills, waterfalls, and rich biodiversity including the Nilgiri Tahr.",
        imageUrl: "/images/destinations/munnar.avif",
        category: "mountains",
        bestTimeToVisit: "September to March",
        weather: "Cool and pleasant throughout most of the year.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "mid-range"
    },

    {
        id: 5,
        name: "Varanasi",
        city: "Varanasi",
        country: "India",
        description: "One of the world's oldest living cities, renowned for its spiritual atmosphere, sacred ghats, ancient temples, and mesmerizing evening Ganga Aarti.",
        imageUrl: "/images/destinations/varanasi.avif",
        category: "heritage",
        bestTimeToVisit: "October to March",
        weather: "Pleasant winters and very hot summers.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.7,
        budgetCategory: "budget"
    },

    {
        id: 6,
        name: "Andaman and Nicobar Islands",
        city: "Port Blair",
        country: "India",
        description: "A tropical paradise with crystal-clear waters, white sandy beaches, coral reefs, and world-class scuba diving and snorkeling experiences.",
        imageUrl: "/images/destinations/andaman-nicobar.avif",
        category: "beach",
        bestTimeToVisit: "October to May",
        weather: "Warm tropical climate with high humidity throughout the year.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport, visa, and Restricted Area Permit where applicable.",
        averageRating: 4.9,
        budgetCategory: "luxury"
    },

    {
        id: 7,
        name: "Agra",
        city: "Agra",
        country: "India",
        description: "Home to the iconic Taj Mahal, Agra is famous for its magnificent Mughal architecture, historical significance, and landmarks like Agra Fort.",
        imageUrl: "/images/destinations/agra.avif",
        category: "heritage",
        bestTimeToVisit: "October to March",
        weather: "Pleasant winters with extremely hot summers.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "budget"
    },

    {
        id: 8,
        name: "Jim Corbett National Park",
        city: "Ramnagar",
        country: "India",
        description: "India's oldest national park, famous for Bengal tigers, diverse wildlife, birdwatching, and exciting jeep safaris through forests and riverine landscapes.",
        imageUrl: "/images/destinations/jim-corbett-national-park.avif",
        category: "adventure",
        bestTimeToVisit: "November to June",
        weather: "Pleasant winters, warm summers, and heavy monsoon rainfall.",
        entryRequirements: "Valid government-issued ID. Advance safari permits are required. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "mid-range"
    }
];

export function getFeaturedId(list) {
    if (list.length === 0) return undefined;
    return list.reduce((best, d) => (d.averageRating > best.averageRating ? d : best))
    .id;
}

const categories = [
    { id: "heritage", label: "Heritage", icon: "account_balance" },
    { id: "beach", label: "Beach", icon: "beach_access" },
    { id: "mountains", label: "Mountains", icon: "forest" },
    { id: "adventure", label: "Adventure", icon: "hiking" },
]

export {categories}

// change with api call later
export function getDestinations() {
    return destinations;
}