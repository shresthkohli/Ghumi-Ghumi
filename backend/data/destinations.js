const destinations = [
    {
        name: "Jaipur",
        city: "Jaipur",
        country: "India",
        description: "Famous for its rich history, majestic palaces, forts, vibrant bazaars, and authentic Rajasthani culture. Jaipur offers a royal experience with breathtaking architecture and delicious local cuisine.",
        imageUrl: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "heritage",
        bestTimeToVisit: "October to March",
        weather: "Pleasant winters with warm sunny days. Summers can be extremely hot.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "mid-range"
    },

    {
        name: "Goa",
        city: "Panaji",
        country: "India",
        description: "India's most popular beach destination, known for its Portuguese heritage, lively nightlife, delicious seafood, and pristine beaches along the Arabian Sea.",
        imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "beach",
        bestTimeToVisit: "November to February",
        weather: "Warm tropical climate throughout the year with pleasant winters.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.7,
        budgetCategory: "mid-range"
    },

    {
        name: "Ladakh",
        city: "Leh",
        country: "India",
        description: "A breathtaking high-altitude desert known for dramatic mountains, serene monasteries, crystal-clear lakes, and thrilling adventures like trekking and motorbiking.",
        imageUrl: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "adventure",
        bestTimeToVisit: "May to September",
        weather: "Cool summers and freezing winters with low rainfall.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport, visa, and may require Inner Line Permits for certain regions.",
        averageRating: 4.9,
        budgetCategory: "luxury"
    },

    {
        name: "Munnar",
        city: "Munnar",
        country: "India",
        description: "A peaceful hill station famous for lush tea plantations, misty hills, waterfalls, and rich biodiversity including the Nilgiri Tahr.",
        imageUrl: "https://images.unsplash.com/photo-1591089101324-2280d9260000?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "mountains",
        bestTimeToVisit: "September to March",
        weather: "Cool and pleasant throughout most of the year.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "mid-range"
    },

    {
        name: "Varanasi",
        city: "Varanasi",
        country: "India",
        description: "One of the world's oldest living cities, renowned for its spiritual atmosphere, sacred ghats, ancient temples, and mesmerizing evening Ganga Aarti.",
        imageUrl: "https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "heritage",
        bestTimeToVisit: "October to March",
        weather: "Pleasant winters and very hot summers.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.7,
        budgetCategory: "budget"
    },

    {
        name: "Andaman and Nicobar Islands",
        city: "Port Blair",
        country: "India",
        description: "A tropical paradise with crystal-clear waters, white sandy beaches, coral reefs, and world-class scuba diving and snorkeling experiences.",
        imageUrl: "https://images.unsplash.com/photo-1642498232612-a837df233825?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "beach",
        bestTimeToVisit: "October to May",
        weather: "Warm tropical climate with high humidity throughout the year.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport, visa, and Restricted Area Permit where applicable.",
        averageRating: 4.9,
        budgetCategory: "luxury"
    },

    {
        name: "Agra",
        city: "Agra",
        country: "India",
        description: "Home to the iconic Taj Mahal, Agra is famous for its magnificent Mughal architecture, historical significance, and landmarks like Agra Fort.",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "heritage",
        bestTimeToVisit: "October to March",
        weather: "Pleasant winters with extremely hot summers.",
        entryRequirements: "Valid government-issued ID. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "budget"
    },

    {
        name: "Jim Corbett National Park",
        city: "Ramnagar",
        country: "India",
        description: "India's oldest national park, famous for Bengal tigers, diverse wildlife, birdwatching, and exciting jeep safaris through forests and riverine landscapes.",
        imageUrl: "https://images.unsplash.com/photo-1656828059237-add66db82a2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "adventure",
        bestTimeToVisit: "November to June",
        weather: "Pleasant winters, warm summers, and heavy monsoon rainfall.",
        entryRequirements: "Valid government-issued ID. Advance safari permits are required. Foreign visitors require a valid passport and visa.",
        averageRating: 4.8,
        budgetCategory: "mid-range"
    }
];

export default destinations;