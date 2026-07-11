// Seed data for the Destinations search page.

export const destinations = [
    {
        id: "jaipur",
        name: "Jaipur, Rajasthan",
        tagline: "The Pink City",
        category: "heritage", // heritage | beach | nature | adventure
        description:
        "Famous for its rich history, majestic palaces, forts, and vibrant culture. A royal experience with breathtaking architecture, local bazaars, and traditional Rajasthani cuisine.",
        image: "https://placehold.co/1600x900/a23f1a/fff8f4?text=Jaipur",
        thumbnail: "https://placehold.co/800x1000/a23f1a/fff8f4?text=Jaipur",
        bestTime: "October to March",
        budgetRange: "\u20b915,000 \u2013 \u20b925,000",
        tripLength: "3-4 days",
        transport:
        "Flights to Jaipur International Airport (JAI), or premium trains like the Shatabdi Express and Vande Bharat.",
        featured: true,
    },
    {
        id: "goa",
        name: "Goa",
        tagline: "Sun, Sand & Portuguese Heritage",
        category: "beach",
        description:
        "India's most popular beach destination, known for its Portuguese heritage, electric nightlife, seafood, and pristine beaches stretching along the Arabian Sea.",
        image: "https://placehold.co/1600x900/276868/fff8f4?text=Goa",
        thumbnail: "https://placehold.co/800x1000/276868/fff8f4?text=Goa",
        bestTime: "November to February",
        budgetRange: "\u20b915,000 \u2013 \u20b930,000",
        tripLength: "4-5 days",
        transport:
        "Flights to Dabolim (GOI) or Mopa (GOX) airports. Trains to Madgaon station offer a scenic route.",
        featured: false,
    },
    {
        id: "ladakh",
        name: "Ladakh",
        tagline: "High-Altitude Adventure",
        category: "adventure",
        description:
        "A high-altitude desert known for its breathtaking rugged landscapes, serene Buddhist monasteries, and thrilling adventure tourism like motorbiking and trekking.",
        image: "https://placehold.co/1600x900/4e6447/fff8f4?text=Ladakh",
        thumbnail: "https://placehold.co/800x1000/4e6447/fff8f4?text=Ladakh",
        bestTime: "May to September",
        budgetRange: "\u20b925,000 \u2013 \u20b940,000",
        tripLength: "6-7 days",
        transport:
        "Flights to Kushok Bakula Rimpochee Airport (IXL) in Leh, or road trips via the Manali-Leh or Srinagar-Leh highways.",
        featured: false,
    },
    {
        id: "munnar",
        name: "Munnar, Kerala",
        tagline: "Emerald Tea Estates",
        category: "nature",
        description:
        "A serene hill station famous for its sprawling, emerald-green tea estates, misty valleys, and exotic flora and fauna like the Nilgiri Tahr.",
        image: "https://placehold.co/1600x900/629f9f/1f1b15?text=Munnar",
        thumbnail: "https://placehold.co/800x1000/629f9f/1f1b15?text=Munnar",
        bestTime: "September to March",
        budgetRange: "\u20b912,000 \u2013 \u20b920,000",
        tripLength: "3-4 days",
        transport:
        "Flights to Cochin International Airport (COK), followed by a 3-4 hour scenic taxi or bus ride.",
        featured: false,
    },
    {
        id: "varanasi",
        name: "Varanasi, Uttar Pradesh",
        tagline: "The Spiritual Capital",
        category: "heritage",
        description:
        "One of the world's oldest living cities, offering a profound spiritual experience. Known for its mesmerizing evening Ganga Aarti, ancient temples, and winding alleys.",
        image: "https://placehold.co/1600x900/822803/fff8f4?text=Varanasi",
        thumbnail: "https://placehold.co/800x1000/822803/fff8f4?text=Varanasi",
        bestTime: "October to March",
        budgetRange: "\u20b98,000 \u2013 \u20b915,000",
        tripLength: "2-3 days",
        transport:
        "Flights to Lal Bahadur Shastri Airport (VNS) or excellent train connectivity (Varanasi Junction).",
        featured: false,
    },
    {
        id: "andaman-nicobar",
        name: "Andaman and Nicobar Islands",
        tagline: "Tropical Island Paradise",
        category: "beach",
        description:
        "A tropical paradise boasting crystal-clear blue waters, white sandy beaches, and some of the best scuba diving and snorkeling spots in South Asia.",
        image: "https://placehold.co/1600x900/276868/fff8f4?text=Andaman",
        thumbnail: "https://placehold.co/800x1000/276868/fff8f4?text=Andaman",
        bestTime: "October to May",
        budgetRange: "\u20b935,000 \u2013 \u20b955,000",
        tripLength: "5-6 days",
        transport:
        "Flights to Veer Savarkar Airport (IXZ) in Port Blair. Ferries are used for inter-island transport.",
        featured: false,
    },
    {
        id: "agra",
        name: "Agra, Uttar Pradesh",
        tagline: "Home of the Taj Mahal",
        category: "heritage",
        description:
        "Home to the iconic Taj Mahal, Agra is a must-visit for its stunning Mughal architecture, historical significance, and legendary monuments like the Agra Fort.",
        image: "https://placehold.co/1600x900/a23f1a/fff8f4?text=Agra",
        thumbnail: "https://placehold.co/800x1000/a23f1a/fff8f4?text=Agra",
        bestTime: "October to March",
        budgetRange: "\u20b95,000 \u2013 \u20b910,000",
        tripLength: "1-2 days",
        transport:
        "Fast trains from Delhi (Gatimaan Express), or road trips via the Yamuna Expressway.",
        featured: false,
    },
    {
        id: "jim-corbett",
        name: "Jim Corbett National Park",
        tagline: "Wild Uttarakhand",
        category: "nature",
        description:
        "India's oldest national park, nestled in the foothills of the Himalayas. Famous for its Bengal tiger population, rich birdlife, and thrilling jeep safaris.",
        image: "https://placehold.co/1600x900/4e6447/fff8f4?text=Jim+Corbett",
        thumbnail: "https://placehold.co/800x1000/4e6447/fff8f4?text=Jim+Corbett",
        bestTime: "November to June",
        budgetRange: "\u20b98,000 \u2013 \u20b935,000+",
        tripLength: "2-3 days",
        transport:
        "Ramnagar Railway Station is the closest railhead (15 km away), well connected from New Delhi by trains and buses.",
        featured: false,
    },
];

// Every filterable category
export const categories = [
  { id: "heritage", label: "Heritage", icon: "account_balance" },
  { id: "beach", label: "Beach", icon: "beach_access" },
  { id: "nature", label: "Nature", icon: "forest" },
  { id: "adventure", label: "Adventure", icon: "hiking" },
];

// getDestination function that can be changed later to get real data
export function getDestinations() {
  return destinations;
}