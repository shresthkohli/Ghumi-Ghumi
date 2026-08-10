const destinations = [
    {
        "id": "00000001-1111-4111-a111-111111111111",
        "name": "Rishikesh",
        "city": "Rishikesh",
        "state": "Uttarakhand",
        "country": "India",
        "description": "A spiritual and adventure destination on the banks of the Ganges, known for yoga retreats, river rafting, suspension bridges, and scenic Himalayan surroundings.",
        "imageUrl": "/images/destinations/rishikesh.avif",
        "category": "adventure",
        "bestTimeToVisit": "September to November and February to May",
        "weather": "Pleasant winters, hot summers, and heavy monsoons between July and August.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.6,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "water",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000001-2222-4111-a111-111111111111",
                "userId": "00000001-3333-4111-a111-111111111111",
                "userName": "Aarav Sharma",
                "destinationId": "00000001-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Incredible river rafting experience and peaceful evening aarti at the ghats.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000001-4441-4111-a111-111111111111",
                "name": "Laxman Jhula",
                "description": "Historic suspension bridge and landmark overlooking the Ganges.",
                "icon": "account_balance"
            },
            {
                "id": "00000001-4442-4111-a111-111111111111",
                "name": "Triveni Ghat",
                "description": "Popular riverside ghat known for its evening Ganga Aarti.",
                "icon": "water"
            },
            {
                "id": "00000001-4443-4111-a111-111111111111",
                "name": "Beatles Ashram",
                "description": "Abandoned ashram famous for hosting the Beatles in the 1960s.",
                "icon": "forest"
            }
        ]
    },
    {
        "id": "00000002-1111-4111-a111-111111111111",
        "name": "Lucknow",
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "country": "India",
        "description": "The 'City of Nawabs', world-renowned for its grand Awadhi architecture, Chikankari embroidery, rich courtly culture, and legendary Awadhi cuisine.",
        "imageUrl": "/images/destinations/lucknow.avif",
        "category": "cultural",
        "bestTimeToVisit": "October to March",
        "weather": "Hot summers, cool and pleasant winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000002-2222-4111-a111-111111111111",
                "userId": "00000002-3333-4111-a111-111111111111",
                "userName": "Tushar Srivastava",
                "destinationId": "00000002-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Bara Imambara's labyrinth (Bhulbhulaiya) and Tunday Kababs are legendary!",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000002-4441-4111-a111-111111111111",
                "name": "Bara Imambara",
                "description": "Grand architectural complex famous for its gravity-defying central hall and labyrinth.",
                "icon": "account_balance"
            },
            {
                "id": "00000002-4442-4111-a111-111111111111",
                "name": "Rumi Darwaza",
                "description": "Imposing 60-foot gateway built in 1784 depicting classic Awadhi design.",
                "icon": "location_city"
            },
            {
                "id": "00000002-4443-4111-a111-111111111111",
                "name": "Chota Imambara",
                "description": "Ornate congregation hall lit with chandeliers and gilded domes.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "00000003-1111-4111-a111-111111111111",
        "name": "Udaipur",
        "city": "Udaipur",
        "state": "Rajasthan",
        "country": "India",
        "description": "The 'City of Lakes', renowned for its opulent royal palaces, romantic boat rides, and vibrant Rajasthani culture.",
        "imageUrl": "/images/destinations/udaipur.avif",
        "category": "romantic",
        "bestTimeToVisit": "September to March",
        "weather": "Extremely hot summers, moderate monsoons, and pleasant winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.8,
        "budgetCategory": "luxury",
        "isFavorite": false,
        "isVisited": false,
        "icon": "water",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000003-2222-4111-a111-111111111111",
                "userId": "00000003-3333-4111-a111-111111111111",
                "userName": "Emily Chen",
                "destinationId": "00000003-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "The City Palace is breathtaking, and sunset over Lake Pichola is a memory I'll cherish forever.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000003-4441-4111-a111-111111111111",
                "name": "City Palace",
                "description": "A sprawling architectural marvel overlooking Lake Pichola.",
                "icon": "account_balance"
            },
            {
                "id": "00000003-4442-4111-a111-111111111111",
                "name": "Lake Pichola",
                "description": "An artificial fresh water lake known for boat cruises and island palaces.",
                "icon": "water"
            },
            {
                "id": "00000003-4443-4111-a111-111111111111",
                "name": "Jag Mandir",
                "description": "An exquisite palace built on an island in Lake Pichola.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "00000004-1111-4111-a111-111111111111",
        "name": "Jaisalmer",
        "city": "Jaisalmer",
        "state": "Rajasthan",
        "country": "India",
        "description": "The 'Golden City', located in the heart of the Thar Desert, known for its massive sandstone fort and desert safaris.",
        "imageUrl": "/images/destinations/jaisalmer.avif",
        "category": "historical",
        "bestTimeToVisit": "October to March",
        "weather": "Extremely hot during summers and cold at night during winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.6,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "terrain",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000004-2222-4111-a111-111111111111",
                "userId": "00000004-3333-4111-a111-111111111111",
                "userName": "David Smith",
                "destinationId": "00000004-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Sleeping under the stars in the Thar desert was amazing.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000004-4441-4111-a111-111111111111",
                "name": "Jaisalmer Fort",
                "description": "One of the few living forts in the world, built from golden sandstone.",
                "icon": "account_balance"
            },
            {
                "id": "00000004-4442-4111-a111-111111111111",
                "name": "Sam Sand Dunes",
                "description": "Famous for camel safaris and spectacular desert sunsets.",
                "icon": "terrain"
            },
            {
                "id": "00000004-4443-4111-a111-111111111111",
                "name": "Patwon Ki Haveli",
                "description": "A cluster of intricately carved historic mansions.",
                "icon": "museum"
            }
        ]
    },
    {
        "id": "00000005-1111-4111-a111-111111111111",
        "name": "Jodhpur",
        "city": "Jodhpur",
        "state": "Rajasthan",
        "country": "India",
        "description": "The 'Blue City' of Rajasthan, dominated by the towering Mehrangarh Fort, blue-painted Brahmin houses, and vibrant spice bazaars.",
        "imageUrl": "/images/destinations/jodhpur.avif",
        "category": "historical",
        "bestTimeToVisit": "October to March",
        "weather": "Hot summers, cool winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000005-2222-4111-a111-111111111111",
                "userId": "00000005-3333-4111-a111-111111111111",
                "userName": "Manish Rathore",
                "destinationId": "00000005-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Looking down at the blue rooftops from Mehrangarh Fort ramparts is unforgettable.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000005-4441-4111-a111-111111111111",
                "name": "Mehrangarh Fort",
                "description": "One of the largest and best-preserved hill forts in India perched 400 feet above city.",
                "icon": "account_balance"
            },
            {
                "id": "00000005-4442-4111-a111-111111111111",
                "name": "Jaswant Thada",
                "description": "White marble cenotaph monument built in memory of Maharaja Jaswant Singh II.",
                "icon": "museum"
            },
            {
                "id": "00000005-4443-4111-a111-111111111111",
                "name": "Umaid Bhawan Palace",
                "description": "Grand royal residence turned luxury heritage hotel and museum.",
                "icon": "location_city"
            }
        ]
    },
    {
        "id": "00000006-1111-4111-a111-111111111111",
        "name": "Palolem & Dudhsagar",
        "city": "Canacona",
        "state": "Goa",
        "country": "India",
        "description": "South Goa's tranquil crescent beach surrounded by coconut palms, alongside the majestic four-tiered Dudhsagar Waterfalls inside Bhagwan Mahavir Sanctuary.",
        "imageUrl": "/images/destinations/dudhsagar.avif",
        "category": "beach",
        "bestTimeToVisit": "October to March",
        "weather": "Tropical beach climate with heavy monsoon rainfall.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.8,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "beach_access",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000006-2222-4111-a111-111111111111",
                "userId": "00000006-3333-4111-a111-111111111111",
                "userName": "Nikhil Naik",
                "destinationId": "00000006-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Jeep safari to Dudhsagar waterfall and swimming at quiet Palolem beach were perfection.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000006-4441-4111-a111-111111111111",
                "name": "Dudhsagar Falls",
                "description": "Spectacular 310-meter four-tiered white water drop surrounded by jungle.",
                "icon": "water"
            },
            {
                "id": "00000006-4442-4111-a111-111111111111",
                "name": "Palolem Beach",
                "description": "Peaceful crescent beach famous for kayaking and dolphin spotting.",
                "icon": "beach_access"
            },
            {
                "id": "00000006-4443-4111-a111-111111111111",
                "name": "Cabo de Rama Fort",
                "description": "Historic cliffside fort offering sweeping panoramas of Arabian sea.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000007-1111-4111-a111-111111111111",
        "name": "Aizawl",
        "city": "Aizawl",
        "state": "Mizoram",
        "country": "India",
        "description": "Set along steep ridges, offering rich Mizo culture, peaceful hills, and pristine natural beauty.",
        "imageUrl": "/images/destinations/aizawl.avif",
        "category": "hill_station",
        "bestTimeToVisit": "October to March",
        "weather": "Cool summers, pleasant winters.",
        "entryRequirements": "Inner Line Permit (ILP) required.",
        "averageRating": 4.4,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000007-2222-4111-a111-111111111111",
                "userId": "00000007-3333-4111-a111-111111111111",
                "userName": "Lalthantluanga Sailo",
                "destinationId": "00000007-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Peaceful hill city with stunning sunset vistas.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000007-4441-4111-a111-111111111111",
                "name": "Reiek Tlang",
                "description": "Scenic mountain peak offering panoramic valley views.",
                "icon": "terrain"
            },
            {
                "id": "00000007-4442-4111-a111-111111111111",
                "name": "Solomon's Temple",
                "description": "White marble church with grand architecture.",
                "icon": "account_balance"
            },
            {
                "id": "00000007-4443-4111-a111-111111111111",
                "name": "Durtlang Hills",
                "description": "Hilltop vantage point over Aizawl.",
                "icon": "landscape"
            }
        ]
    },
    {
        "id": "00000008-1111-4111-a111-111111111111",
        "name": "Manali",
        "city": "Manali",
        "state": "Himachal Pradesh",
        "country": "India",
        "description": "A high-altitude Himalayan resort town renowned for its backpacking center, honeymoon destinations, skiing in Solang Valley, and trekking adventures.",
        "imageUrl": "/images/destinations/manali.avif",
        "category": "hill_station",
        "bestTimeToVisit": "October to June",
        "weather": "Cold winters with heavy snowfall, followed by cool and pleasant summers.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.5,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000008-2222-4111-a111-111111111111",
                "userId": "00000008-3333-4111-a111-111111111111",
                "userName": "Priya Patel",
                "destinationId": "00000008-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Beautiful snow-capped peaks and great cafes in Old Manali.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000008-4441-4111-a111-111111111111",
                "name": "Rohtang Pass",
                "description": "High mountain pass offering stunning snowy landscapes.",
                "icon": "terrain"
            },
            {
                "id": "00000008-4442-4111-a111-111111111111",
                "name": "Solang Valley",
                "description": "Hub for adventure sports like paragliding and skiing.",
                "icon": "landscape"
            },
            {
                "id": "00000008-4443-4111-a111-111111111111",
                "name": "Hadimba Temple",
                "description": "Ancient cave temple surrounded by a cedar forest.",
                "icon": "temple_buddhist"
            }
        ]
    },
    {
        "id": "00000009-1111-4111-a111-111111111111",
        "name": "Shimla",
        "city": "Shimla",
        "state": "Himachal Pradesh",
        "country": "India",
        "description": "The former summer capital of British India, known for its colonial architecture, scenic toy train railway, and the bustling Mall Road.",
        "imageUrl": "/images/destinations/shimla.avif",
        "category": "hill_station",
        "bestTimeToVisit": "March to June and October to February",
        "weather": "Pleasant summers and cold winters with occasional snowfall.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.4,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "location_city",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000009-2222-4111-a111-111111111111",
                "userId": "00000009-3333-4111-a111-111111111111",
                "userName": "Rohan Gupta",
                "destinationId": "00000009-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Walking along the Ridge and Mall Road was delightful.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000009-4441-4111-a111-111111111111",
                "name": "The Ridge",
                "description": "Large open space offering panoramic mountain views.",
                "icon": "terrain"
            },
            {
                "id": "00000009-4442-4111-a111-111111111111",
                "name": "Mall Road",
                "description": "Main street filled with shops, cafes, and heritage sites.",
                "icon": "store"
            },
            {
                "id": "00000009-4443-4111-a111-111111111111",
                "name": "Jakhoo Temple",
                "description": "Ancient temple dedicated to Lord Hanuman on highest peak.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "0000000a-1111-4111-a111-111111111111",
        "name": "Alleppey",
        "city": "Alappuzha",
        "state": "Kerala",
        "country": "India",
        "description": "The 'Venice of the East', celebrated for its romantic houseboat cruises along tranquil palm-lined backwaters and lush paddy fields.",
        "imageUrl": "/images/destinations/alleppey.avif",
        "category": "romantic",
        "bestTimeToVisit": "October to February",
        "weather": "Warm and tropical, with heavy monsoon rainfall.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "sailing",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000000a-2222-4111-a111-111111111111",
                "userId": "0000000a-3333-4111-a111-111111111111",
                "userName": "Ananya Pillai",
                "destinationId": "0000000a-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Private houseboat cruise through quiet backwaters was pure bliss.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000000a-4441-4111-a111-111111111111",
                "name": "Kerala Backwaters",
                "description": "Vast network of interconnected canals, rivers, and lakes.",
                "icon": "water"
            },
            {
                "id": "0000000a-4442-4111-a111-111111111111",
                "name": "Alappuzha Beach",
                "description": "Popular beach featuring a historic 150-year-old pier.",
                "icon": "beach_access"
            },
            {
                "id": "0000000a-4443-4111-a111-111111111111",
                "name": "Vembanad Lake",
                "description": "Longest lake in India, host of the famous Nehru Trophy Boat Race.",
                "icon": "sailing"
            }
        ]
    },
    {
        "id": "0000000b-1111-4111-a111-111111111111",
        "name": "Wayanad",
        "city": "Kalpetta",
        "state": "Kerala",
        "country": "India",
        "description": "A rural district in Kerala known for its spice plantations, wildlife sanctuaries, beautiful waterfalls, and ancient caves.",
        "imageUrl": "/images/destinations/wayanad.avif",
        "category": "nature",
        "bestTimeToVisit": "October to May",
        "weather": "Pleasant year-round, but experiences heavy rainfall from June to September.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.6,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000000b-2222-4111-a111-111111111111",
                "userId": "0000000b-3333-4111-a111-111111111111",
                "userName": "Akshay Nair",
                "destinationId": "0000000b-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Trek to Chembra heart-shaped lake was pure magic.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000000b-4441-4111-a111-111111111111",
                "name": "Edakkal Caves",
                "description": "Two natural caves containing ancient petroglyphs and rock carvings.",
                "icon": "terrain"
            },
            {
                "id": "0000000b-4442-4111-a111-111111111111",
                "name": "Banasura Sagar Dam",
                "description": "The largest earth dam in India offering speed boating and scenic views.",
                "icon": "water"
            },
            {
                "id": "0000000b-4443-4111-a111-111111111111",
                "name": "Chembra Peak",
                "description": "The highest peak in Wayanad, famous for its heart-shaped lake.",
                "icon": "landscape"
            }
        ]
    },
    {
        "id": "0000000c-1111-4111-a111-111111111111",
        "name": "Imphal",
        "city": "Imphal",
        "state": "Manipur",
        "country": "India",
        "description": "The capital of Manipur, famous for Loktak Lake with floating phumdis and Keibul Lamjao floating park.",
        "imageUrl": "/images/destinations/imphal.avif",
        "category": "nature",
        "bestTimeToVisit": "October to April",
        "weather": "Pleasant climate.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "water",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000000c-2222-4111-a111-111111111111",
                "userId": "0000000c-3333-4111-a111-111111111111",
                "userName": "Linthoingambi Meitei",
                "destinationId": "0000000c-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Floating homestay on Loktak Lake is unbelievable.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000000c-4441-4111-a111-111111111111",
                "name": "Loktak Lake",
                "description": "Largest freshwater lake in Northeast with floating islands.",
                "icon": "water"
            },
            {
                "id": "0000000c-4442-4111-a111-111111111111",
                "name": "Keibul Lamjao Park",
                "description": "World's only floating national park.",
                "icon": "forest"
            },
            {
                "id": "0000000c-4443-4111-a111-111111111111",
                "name": "Kangla Fort",
                "description": "Ancient seat of Manipur rulers.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "0000000d-1111-4111-a111-111111111111",
        "name": "Amritsar",
        "city": "Amritsar",
        "state": "Punjab",
        "country": "India",
        "description": "The spiritual and cultural center of the Sikh religion, home to the spectacular Golden Temple and rich historical monuments.",
        "imageUrl": "/images/destinations/amritsar.avif",
        "category": "pilgrimage",
        "bestTimeToVisit": "October to March",
        "weather": "Scorching summers, pleasant autumns, and cold winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.8,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "temple_buddhist",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000000d-2222-4111-a111-111111111111",
                "userId": "0000000d-3333-4111-a111-111111111111",
                "userName": "Vikram Singh",
                "destinationId": "0000000d-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "The Golden Temple at night is humbling and peaceful.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000000d-4441-4111-a111-111111111111",
                "name": "Golden Temple",
                "description": "The holiest Gurdwara of Sikhism covered in gold leaf.",
                "icon": "account_balance"
            },
            {
                "id": "0000000d-4442-4111-a111-111111111111",
                "name": "Jallianwala Bagh",
                "description": "Historic garden and memorial of national importance.",
                "icon": "park"
            },
            {
                "id": "0000000d-4443-4111-a111-111111111111",
                "name": "Wagah Border",
                "description": "Daily border ceremony between Indian and Pakistani forces.",
                "icon": "tour"
            }
        ]
    },
    {
        "id": "0000000e-1111-4111-a111-111111111111",
        "name": "Kurukshetra",
        "city": "Kurukshetra",
        "state": "Haryana",
        "country": "India",
        "description": "A holy historical city revered as the battlefield of Mahabharata and the sacred land where Lord Krishna delivered the Bhagavad Gita.",
        "imageUrl": "/images/destinations/kurukshetra.avif",
        "category": "historical",
        "bestTimeToVisit": "October to March",
        "weather": "Hot summers, cool winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.4,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000000e-2222-4111-a111-111111111111",
                "userId": "0000000e-3333-4111-a111-111111111111",
                "userName": "Rajesh Saini",
                "destinationId": "0000000e-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Brahma Sarovar is massive and peaceful.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000000e-4441-4111-a111-111111111111",
                "name": "Brahma Sarovar",
                "description": "Ancient water tank considered one of largest in Asia.",
                "icon": "water"
            },
            {
                "id": "0000000e-4442-4111-a111-111111111111",
                "name": "Jyotisar",
                "description": "Sacred site under banyan tree where Bhagavad Gita was spoken.",
                "icon": "park"
            },
            {
                "id": "0000000e-4443-4111-a111-111111111111",
                "name": "Krishna Museum",
                "description": "Museum depicting life and teachings of Lord Krishna.",
                "icon": "museum"
            }
        ]
    },
    {
        "id": "0000000f-1111-4111-a111-111111111111",
        "name": "Delhi",
        "city": "Delhi",
        "state": "Delhi",
        "country": "India",
        "description": "The historical capital of India, blending centuries of Mughal history, colonial architecture, street markets, and modern infrastructure.",
        "imageUrl": "/images/destinations/delhi.avif",
        "category": "urban",
        "bestTimeToVisit": "October to March",
        "weather": "Extremely hot summers and cold winters.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.4,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "location_city",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000000f-2222-4111-a111-111111111111",
                "userId": "0000000f-3333-4111-a111-111111111111",
                "userName": "Kabir Khanna",
                "destinationId": "0000000f-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Chandni Chowk food and Qutub Minar complex are essential experiences.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000000f-4441-4111-a111-111111111111",
                "name": "Red Fort",
                "description": "17th-century Mughal red sandstone fortress.",
                "icon": "account_balance"
            },
            {
                "id": "0000000f-4442-4111-a111-111111111111",
                "name": "Qutub Minar",
                "description": "UNESCO World Heritage tallest brick minaret in world.",
                "icon": "account_balance"
            },
            {
                "id": "0000000f-4443-4111-a111-111111111111",
                "name": "Humayun's Tomb",
                "description": "Sublime Mughal garden tomb that inspired Taj Mahal.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "00000010-1111-4111-a111-111111111111",
        "name": "Srinagar",
        "city": "Srinagar",
        "state": "Jammu and Kashmir",
        "country": "India",
        "description": "Known as 'Paradise on Earth', famous for its tranquil Dal Lake, beautiful houseboats, and stunning Mughal gardens.",
        "imageUrl": "/images/destinations/srinagar.avif",
        "category": "romantic",
        "bestTimeToVisit": "April to October",
        "weather": "Cold winters with heavy snow and pleasant, cool summers.",
        "entryRequirements": "Valid government-issued photo ID is generally sufficient for domestic travelers.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "sailing",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000010-2222-4111-a111-111111111111",
                "userId": "00000010-3333-4111-a111-111111111111",
                "userName": "Meera Reddy",
                "destinationId": "00000010-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Houseboat stay on Dal Lake was romantic and peaceful.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000010-4441-4111-a111-111111111111",
                "name": "Dal Lake",
                "description": "Iconic lake offering shikara rides and floating markets.",
                "icon": "water"
            },
            {
                "id": "00000010-4442-4111-a111-111111111111",
                "name": "Shalimar Bagh",
                "description": "Magnificent Mughal garden built by Emperor Jahangir.",
                "icon": "park"
            },
            {
                "id": "00000010-4443-4111-a111-111111111111",
                "name": "Shankaracharya Temple",
                "description": "Hilltop temple with panoramic city views.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "00000011-1111-4111-a111-111111111111",
        "name": "Rann of Kutch",
        "city": "Bhuj",
        "state": "Gujarat",
        "country": "India",
        "description": "A vast seasonal salt marsh famous for its surreal white landscape and the vibrant cultural festival, Rann Utsav.",
        "imageUrl": "/images/destinations/rann-of-kutch.avif",
        "category": "cultural",
        "bestTimeToVisit": "November to February",
        "weather": "Hot summers, submerged during monsoon, pleasant dry winters.",
        "entryRequirements": "Entry permit required at Bhirandiyara checkpoint.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "terrain",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000011-2222-4111-a111-111111111111",
                "userId": "00000011-3333-4111-a111-111111111111",
                "userName": "Sneha Roy",
                "destinationId": "00000011-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Full moon night on the white salt desert is otherworldly.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000011-4441-4111-a111-111111111111",
                "name": "Great Rann of Kutch",
                "description": "One of largest salt deserts in the world.",
                "icon": "terrain"
            },
            {
                "id": "00000011-4442-4111-a111-111111111111",
                "name": "Kalo Dungar",
                "description": "Highest point in Kutch offering views of Rann.",
                "icon": "landscape"
            },
            {
                "id": "00000011-4443-4111-a111-111111111111",
                "name": "Kutch Museum",
                "description": "Oldest museum in Gujarat displaying tribal art.",
                "icon": "museum"
            }
        ]
    },
    {
        "id": "00000012-1111-4111-a111-111111111111",
        "name": "Ahmedabad",
        "city": "Ahmedabad",
        "state": "Gujarat",
        "country": "India",
        "description": "India's first UNESCO World Heritage City, famous for history, Sabarmati Ashram, stepwells, and street food.",
        "imageUrl": "/images/destinations/ahmedabad.avif",
        "category": "cultural",
        "bestTimeToVisit": "November to February",
        "weather": "Hot summers, pleasant dry winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.3,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000012-2222-4111-a111-111111111111",
                "userId": "00000012-3333-4111-a111-111111111111",
                "userName": "Parth Shah",
                "destinationId": "00000012-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Sabarmati Ashram and Adalaj stepwell are wonderful.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000012-4441-4111-a111-111111111111",
                "name": "Sabarmati Ashram",
                "description": "Mahatma Gandhi's former residence.",
                "icon": "account_balance"
            },
            {
                "id": "00000012-4442-4111-a111-111111111111",
                "name": "Adalaj Stepwell",
                "description": "Carved five-story 15th-century stepwell.",
                "icon": "water"
            },
            {
                "id": "00000012-4443-4111-a111-111111111111",
                "name": "Kankaria Lake",
                "description": "Circular lake with parks and entertainment.",
                "icon": "water"
            }
        ]
    },
    {
        "id": "00000013-1111-4111-a111-111111111111",
        "name": "Mumbai",
        "city": "Mumbai",
        "state": "Maharashtra",
        "country": "India",
        "description": "The financial capital of India, known for Bollywood, colonial heritage architecture, street food, and Marine Drive.",
        "imageUrl": "/images/destinations/mumbai.avif",
        "category": "urban",
        "bestTimeToVisit": "October to February",
        "weather": "Hot and humid most of year with monsoon rains.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "luxury",
        "isFavorite": false,
        "isVisited": false,
        "icon": "location_city",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000013-2222-4111-a111-111111111111",
                "userId": "00000013-3333-4111-a111-111111111111",
                "userName": "Neha Joshi",
                "destinationId": "00000013-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Marine Drive sunset walk is magical.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000013-4441-4111-a111-111111111111",
                "name": "Gateway of India",
                "description": "Iconic arch monument overlooking Arabian Sea.",
                "icon": "account_balance"
            },
            {
                "id": "00000013-4442-4111-a111-111111111111",
                "name": "Marine Drive",
                "description": "Picturesque C-shaped seaside promenade.",
                "icon": "water"
            },
            {
                "id": "00000013-4443-4111-a111-111111111111",
                "name": "Elephanta Caves",
                "description": "UNESCO World Heritage rock-cut cave temples.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000014-1111-4111-a111-111111111111",
        "name": "Pune",
        "city": "Pune",
        "state": "Maharashtra",
        "country": "India",
        "description": "A vibrant city blending Maratha history with a thriving modern youth culture, known for educational institutions and Osho Ashram.",
        "imageUrl": "/images/destinations/pune.avif",
        "category": "urban",
        "bestTimeToVisit": "July to February",
        "weather": "Moderate climate, with pleasant winters and substantial monsoon rainfall.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.2,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "location_city",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000014-2222-4111-a111-111111111111",
                "userId": "00000014-3333-4111-a111-111111111111",
                "userName": "Amit Kulkarni",
                "destinationId": "00000014-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "A great mix of historical forts nearby and lively cafe scene.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000014-4441-4111-a111-111111111111",
                "name": "Aga Khan Palace",
                "description": "Historic palace tied to Indian freedom movement.",
                "icon": "account_balance"
            },
            {
                "id": "00000014-4442-4111-a111-111111111111",
                "name": "Shaniwar Wada",
                "description": "Historical fortification of Peshwa Empire.",
                "icon": "account_balance"
            },
            {
                "id": "00000014-4443-4111-a111-111111111111",
                "name": "Osho Meditation Resort",
                "description": "Popular spiritual wellness retreat.",
                "icon": "park"
            }
        ]
    },
    {
        "id": "00000015-1111-4111-a111-111111111111",
        "name": "Mahabaleshwar",
        "city": "Mahabaleshwar",
        "state": "Maharashtra",
        "country": "India",
        "description": "A picturesque hill station in the Western Ghats renowned for its strawberry farms, majestic viewpoints, and lush green forests.",
        "imageUrl": "/images/destinations/mahabaleshwar.avif",
        "category": "hill_station",
        "bestTimeToVisit": "October to June",
        "weather": "Pleasant year-round, heavy monsoon rainfall.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.4,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000015-2222-4111-a111-111111111111",
                "userId": "00000015-3333-4111-a111-111111111111",
                "userName": "Ria Deshmukh",
                "destinationId": "00000015-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Gorgeous viewpoints and fresh strawberries!",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000015-4441-4111-a111-111111111111",
                "name": "Arthur's Seat",
                "description": "Popular viewpoint offering dramatic valley views.",
                "icon": "terrain"
            },
            {
                "id": "00000015-4442-4111-a111-111111111111",
                "name": "Venna Lake",
                "description": "Beautiful artificial lake popular for boating.",
                "icon": "water"
            },
            {
                "id": "00000015-4443-4111-a111-111111111111",
                "name": "Pratapgad Fort",
                "description": "Historic hill fort offering Konkan coastline views.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "00000016-1111-4111-a111-111111111111",
        "name": "Bodh Gaya",
        "city": "Gaya",
        "state": "Bihar",
        "country": "India",
        "description": "The premier global Buddhist pilgrimage destination, where Lord Buddha attained enlightenment beneath the Bodhi Tree.",
        "imageUrl": "/images/destinations/bodh-gaya.avif",
        "category": "spiritual",
        "bestTimeToVisit": "October to March",
        "weather": "Warm summers, pleasant cool winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.7,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "temple_buddhist",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000016-2222-4111-a111-111111111111",
                "userId": "00000016-3333-4111-a111-111111111111",
                "userName": "Lin Naing",
                "destinationId": "00000016-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Profound sense of tranquility under the Bodhi Tree.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000016-4441-4111-a111-111111111111",
                "name": "Mahabodhi Temple",
                "description": "UNESCO World Heritage ancient temple of enlightenment.",
                "icon": "account_balance"
            },
            {
                "id": "00000016-4442-4111-a111-111111111111",
                "name": "Great Buddha Statue",
                "description": "Imposing 80-foot seated Buddha statue.",
                "icon": "park"
            },
            {
                "id": "00000016-4443-4111-a111-111111111111",
                "name": "Thai Monastery",
                "description": "Ornate temple with traditional Thai architecture.",
                "icon": "temple_buddhist"
            }
        ]
    },
    {
        "id": "00000017-1111-4111-a111-111111111111",
        "name": "Ranchi",
        "city": "Ranchi",
        "state": "Jharkhand",
        "country": "India",
        "description": "The 'City of Waterfalls', surrounded by scenic plateaus, tribal heritage, pine forests, and cascading falls.",
        "imageUrl": "/images/destinations/ranchi.avif",
        "category": "nature",
        "bestTimeToVisit": "September to March",
        "weather": "Moderate climate year-round.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.3,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "water",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000017-2222-4111-a111-111111111111",
                "userId": "00000017-3333-4111-a111-111111111111",
                "userName": "Sumit Tirkey",
                "destinationId": "00000017-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Hundru and Jonha falls are magnificent in post-monsoon.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000017-4441-4111-a111-111111111111",
                "name": "Hundru Falls",
                "description": "98-meter waterfall on Subarnarekha River.",
                "icon": "water"
            },
            {
                "id": "00000017-4442-4111-a111-111111111111",
                "name": "Jonha Falls",
                "description": "Forest cascade with mountain steps.",
                "icon": "landscape"
            },
            {
                "id": "00000017-4443-4111-a111-111111111111",
                "name": "Netarhat",
                "description": "Nearby serene hill station for sunrise views.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000018-1111-4111-a111-111111111111",
        "name": "Khajuraho",
        "city": "Khajuraho",
        "state": "Madhya Pradesh",
        "country": "India",
        "description": "A UNESCO World Heritage site known worldwide for its stunning ancient temples adorned with intricate sculptures.",
        "imageUrl": "/images/destinations/khajuraho.avif",
        "category": "historical",
        "bestTimeToVisit": "October to February",
        "weather": "Hot summers, cool winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000018-2222-4111-a111-111111111111",
                "userId": "00000018-3333-4111-a111-111111111111",
                "userName": "Anjali Verma",
                "destinationId": "00000018-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Sculptures demonstrate unbelievable medieval Indian artistry.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000018-4441-4111-a111-111111111111",
                "name": "Kandariya Mahadeva Temple",
                "description": "Largest Hindu temple in medieval group.",
                "icon": "account_balance"
            },
            {
                "id": "00000018-4442-4111-a111-111111111111",
                "name": "Lakshmana Temple",
                "description": "Finely preserved ancient temple.",
                "icon": "account_balance"
            },
            {
                "id": "00000018-4443-4111-a111-111111111111",
                "name": "Duladeo Temple",
                "description": "Shiva temple with flying apsara carvings.",
                "icon": "account_balance"
            }
        ]
    },
    {
        "id": "00000019-1111-4111-a111-111111111111",
        "name": "Pachmarhi",
        "city": "Pachmarhi",
        "state": "Madhya Pradesh",
        "country": "India",
        "description": "Known as 'Queen of Satpura', a scenic hill station offering dense forests, beautiful waterfalls, and ancient cave paintings.",
        "imageUrl": "/images/destinations/pachmarhi.avif",
        "category": "hill_station",
        "bestTimeToVisit": "October to June",
        "weather": "Pleasant climate year-round.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.3,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "forest",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000019-2222-4111-a111-111111111111",
                "userId": "00000019-3333-4111-a111-111111111111",
                "userName": "Rajat Kumar",
                "destinationId": "00000019-1111-4111-a111-111111111111",
                "rating": 4,
                "review": "Bee falls and Dhoopgarh sunset were great.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000019-4441-4111-a111-111111111111",
                "name": "Bee Fall",
                "description": "Picturesque waterfall popular for swimming.",
                "icon": "water"
            },
            {
                "id": "00000019-4442-4111-a111-111111111111",
                "name": "Jata Shankar Caves",
                "description": "Sacred cave shrine dedicated to Lord Shiva.",
                "icon": "terrain"
            },
            {
                "id": "00000019-4443-4111-a111-111111111111",
                "name": "Dhoopgarh",
                "description": "Highest point in Satpura range with sunset views.",
                "icon": "landscape"
            }
        ]
    },
    {
        "id": "0000001a-1111-4111-a111-111111111111",
        "name": "Chitrakote Falls",
        "city": "Jagdalpur",
        "state": "Chhattisgarh",
        "country": "India",
        "description": "Often called the 'Niagara Falls of India', a majestic horseshoe waterfall on the Indravati River inside dense forest.",
        "imageUrl": "/images/destinations/chitrakote-falls.avif",
        "category": "nature",
        "bestTimeToVisit": "July to October",
        "weather": "Warm and humid with heavy monsoon rainfall.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.6,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "water",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000001a-2222-4111-a111-111111111111",
                "userId": "0000001a-3333-4111-a111-111111111111",
                "userName": "Bhavna Baghel",
                "destinationId": "0000001a-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Widest waterfall in India... roaring spray in monsoon!",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000001a-4441-4111-a111-111111111111",
                "name": "Chitrakote Waterfalls",
                "description": "300-meter wide horseshoe waterfall.",
                "icon": "water"
            },
            {
                "id": "0000001a-4442-4111-a111-111111111111",
                "name": "Kanger Valley Park",
                "description": "Rainforest area with limestone caves.",
                "icon": "forest"
            },
            {
                "id": "0000001a-4443-4111-a111-111111111111",
                "name": "Kotumsar Cave",
                "description": "Subterranean cave with stalactites.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "0000001b-1111-4111-a111-111111111111",
        "name": "Kolkata",
        "city": "Kolkata",
        "state": "West Bengal",
        "country": "India",
        "description": "The 'City of Joy', celebrated for artistic heritage, colonial monuments, iconic bridges, tramways, and sweets.",
        "imageUrl": "/images/destinations/kolkata.avif",
        "category": "cultural",
        "bestTimeToVisit": "October to March",
        "weather": "Hot humid summers, pleasant winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.6,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000001b-2222-4111-a111-111111111111",
                "userId": "0000001b-3333-4111-a111-111111111111",
                "userName": "Subhash Banerjee",
                "destinationId": "0000001b-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Durga Puja and Victoria Memorial are magical.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000001b-4441-4111-a111-111111111111",
                "name": "Victoria Memorial",
                "description": "Marble monument built for Queen Victoria.",
                "icon": "account_balance"
            },
            {
                "id": "0000001b-4442-4111-a111-111111111111",
                "name": "Howrah Bridge",
                "description": "Iconic cantilever bridge over Hooghly River.",
                "icon": "location_city"
            },
            {
                "id": "0000001b-4443-4111-a111-111111111111",
                "name": "Dakshineswar Kali Temple",
                "description": "Historic temple complex on riverbank.",
                "icon": "temple_buddhist"
            }
        ]
    },
    {
        "id": "0000001c-1111-4111-a111-111111111111",
        "name": "Darjeeling",
        "city": "Darjeeling",
        "state": "West Bengal",
        "country": "India",
        "description": "The 'Queen of Hills', famous for tea estates, views of Kangchenjunga peak, and the UNESCO Himalayan toy train.",
        "imageUrl": "/images/destinations/darjeeling.avif",
        "category": "hill_station",
        "bestTimeToVisit": "March to May and October to November",
        "weather": "Cool summers and cold misty winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000001c-2222-4111-a111-111111111111",
                "userId": "0000001c-3333-4111-a111-111111111111",
                "userName": "Joydeep Mukherji",
                "destinationId": "0000001c-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Tiger Hill sunrise over Kangchenjunga is magnificent.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000001c-4441-4111-a111-111111111111",
                "name": "Tiger Hill",
                "description": "Sunrise view point over Mount Kangchenjunga.",
                "icon": "terrain"
            },
            {
                "id": "0000001c-4442-4111-a111-111111111111",
                "name": "Himalayan Railway",
                "description": "UNESCO World Heritage narrow-gauge toy train.",
                "icon": "tour"
            },
            {
                "id": "0000001c-4443-4111-a111-111111111111",
                "name": "Happy Valley Tea Estate",
                "description": "Historic tea garden producing world-class tea.",
                "icon": "forest"
            }
        ]
    },
    {
        "id": "0000001d-1111-4111-a111-111111111111",
        "name": "Agartala",
        "city": "Agartala",
        "state": "Tripura",
        "country": "India",
        "description": "The capital of Tripura, known for royal palaces like Ujjayanta Palace, Neermahal water palace, and rock-carved relief sculptures of Unakoti.",
        "imageUrl": "/images/destinations/agartala.avif",
        "category": "cultural",
        "bestTimeToVisit": "October to March",
        "weather": "Warm summers, humid monsoons, pleasant winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.4,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000001d-2222-4111-a111-111111111111",
                "userId": "0000001d-3333-4111-a111-111111111111",
                "userName": "Debabrata Debbarma",
                "destinationId": "0000001d-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Neermahal in the middle of Rudrasagar Lake is spectacular.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000001d-4441-4111-a111-111111111111",
                "name": "Ujjayanta Palace",
                "description": "Royal palace built in 1901, now housing Tripura State Museum.",
                "icon": "museum"
            },
            {
                "id": "0000001d-4442-4111-a111-111111111111",
                "name": "Neermahal",
                "description": "Royal water palace situated in middle of Rudrasagar Lake.",
                "icon": "water"
            },
            {
                "id": "0000001d-4443-4111-a111-111111111111",
                "name": "Unakoti",
                "description": "Ancient site featuring massive bas-relief rock carvings of Lord Shiva.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "0000001e-1111-4111-a111-111111111111",
        "name": "Puri",
        "city": "Puri",
        "state": "Odisha",
        "country": "India",
        "description": "A sacred coastal pilgrimage destination home to Jagannath Temple, Rath Yatra festival, and Golden Beach.",
        "imageUrl": "/images/destinations/puri.avif",
        "category": "pilgrimage",
        "bestTimeToVisit": "October to February",
        "weather": "Tropical coastal climate.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.6,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "temple_buddhist",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000001e-2222-4111-a111-111111111111",
                "userId": "0000001e-3333-4111-a111-111111111111",
                "userName": "Debabrata Dash",
                "destinationId": "0000001e-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Golden Beach and Jagannath temple are divine.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000001e-4441-4111-a111-111111111111",
                "name": "Jagannath Temple",
                "description": "Holiest 12th-century shrine of Lord Jagannath.",
                "icon": "account_balance"
            },
            {
                "id": "0000001e-4442-4111-a111-111111111111",
                "name": "Puri Golden Beach",
                "description": "Blue Flag certified beach with golden sand.",
                "icon": "beach_access"
            },
            {
                "id": "0000001e-4443-4111-a111-111111111111",
                "name": "Chilika Lake",
                "description": "Brackish lagoon home to Irrawaddy dolphins.",
                "icon": "water"
            }
        ]
    },
    {
        "id": "0000001f-1111-4111-a111-111111111111",
        "name": "Visakhapatnam",
        "city": "Visakhapatnam",
        "state": "Andhra Pradesh",
        "country": "India",
        "description": "The 'Jewel of the East Coast', famous for beaches, coastal roads, submarine museum, and Araku Valley hills.",
        "imageUrl": "/images/destinations/visakhapatnam.avif",
        "category": "beach",
        "bestTimeToVisit": "October to March",
        "weather": "Tropical and warm coast, cool in Araku hills.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.6,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "beach_access",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000001f-2222-4111-a111-111111111111",
                "userId": "0000001f-3333-4111-a111-111111111111",
                "userName": "Srinivas Rao",
                "destinationId": "0000001f-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Submarine museum on RK Beach is fascinating.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000001f-4441-4111-a111-111111111111",
                "name": "INS Kurusura Submarine Museum",
                "description": "Decommissioned submarine turned museum on beach.",
                "icon": "museum"
            },
            {
                "id": "0000001f-4442-4111-a111-111111111111",
                "name": "Rishikonda Beach",
                "description": "Blue Flag beach popular for water sports.",
                "icon": "beach_access"
            },
            {
                "id": "0000001f-4443-4111-a111-111111111111",
                "name": "Araku Valley",
                "description": "Coffee-plantation hill station in Eastern Ghats.",
                "icon": "landscape"
            }
        ]
    },
    {
        "id": "00000020-1111-4111-a111-111111111111",
        "name": "Hyderabad",
        "city": "Hyderabad",
        "state": "Telangana",
        "country": "India",
        "description": "The 'City of Pearls', blending historic Nizam heritage, Charminar, Golconda fort, world-famous biryani, and tech hubs.",
        "imageUrl": "/images/destinations/hyderabad.avif",
        "category": "urban",
        "bestTimeToVisit": "October to March",
        "weather": "Hot summers, pleasant winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "location_city",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000020-2222-4111-a111-111111111111",
                "userId": "00000020-3333-4111-a111-111111111111",
                "userName": "Kavitha Chander",
                "destinationId": "00000020-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Food and Golconda Fort light show are fantastic.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000020-4441-4111-a111-111111111111",
                "name": "Charminar",
                "description": "16th-century landmark mosque with 4 minarets.",
                "icon": "account_balance"
            },
            {
                "id": "00000020-4442-4111-a111-111111111111",
                "name": "Golconda Fort",
                "description": "Massive medieval fort famous for acoustics.",
                "icon": "account_balance"
            },
            {
                "id": "00000020-4443-4111-a111-111111111111",
                "name": "Ramoji Film City",
                "description": "World's largest film studio complex.",
                "icon": "movie"
            }
        ]
    },
    {
        "id": "00000021-1111-4111-a111-111111111111",
        "name": "Hampi",
        "city": "Hospet",
        "state": "Karnataka",
        "country": "India",
        "description": "A UNESCO World Heritage site offering surreal boulder landscapes and ruins of the Vijayanagara Empire.",
        "imageUrl": "/images/destinations/hampi.avif",
        "category": "historical",
        "bestTimeToVisit": "October to February",
        "weather": "Hot summers, pleasant dry winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.8,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "account_balance",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000021-2222-4111-a111-111111111111",
                "userId": "00000021-3333-4111-a111-111111111111",
                "userName": "Thomas Wright",
                "destinationId": "00000021-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Bicycling through boulder ruins was unforgettable.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000021-4441-4111-a111-111111111111",
                "name": "Virupaksha Temple",
                "description": "Ancient active temple dedicated to Lord Shiva.",
                "icon": "account_balance"
            },
            {
                "id": "00000021-4442-4111-a111-111111111111",
                "name": "Vittala Temple",
                "description": "Iconic stone chariot and musical pillars.",
                "icon": "account_balance"
            },
            {
                "id": "00000021-4443-4111-a111-111111111111",
                "name": "Matanga Hill",
                "description": "Best panoramic sunrise viewpoint over Hampi.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000022-1111-4111-a111-111111111111",
        "name": "Ooty",
        "city": "Ooty",
        "state": "Tamil Nadu",
        "country": "India",
        "description": "The 'Queen of Hill Stations' in the Nilgiris, loved for tea gardens, climate, and toy train railway.",
        "imageUrl": "/images/destinations/ooty.avif",
        "category": "hill_station",
        "bestTimeToVisit": "October to June",
        "weather": "Cool climate year-round.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000022-2222-4111-a111-111111111111",
                "userId": "00000022-3333-4111-a111-111111111111",
                "userName": "Karthik Iyer",
                "destinationId": "00000022-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Nilgiri toy train ride has breathtaking valley views.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000022-4441-4111-a111-111111111111",
                "name": "Botanical Gardens",
                "description": "Gardens with thousands of plant species.",
                "icon": "park"
            },
            {
                "id": "00000022-4442-4111-a111-111111111111",
                "name": "Nilgiri Mountain Railway",
                "description": "UNESCO World Heritage toy train.",
                "icon": "tour"
            },
            {
                "id": "00000022-4443-4111-a111-111111111111",
                "name": "Ooty Lake",
                "description": "Artificial lake popular for boating.",
                "icon": "water"
            }
        ]
    },
    {
        "id": "00000023-1111-4111-a111-111111111111",
        "name": "Kodaikanal",
        "city": "Kodaikanal",
        "state": "Tamil Nadu",
        "country": "India",
        "description": "The 'Princess of Hill Stations', tucked away in the Palani Hills, featuring a central star-shaped lake, pine forests, and misty waterfalls.",
        "imageUrl": "/images/destinations/kodaikanal.avif",
        "category": "hill_station",
        "bestTimeToVisit": "September to May",
        "weather": "Pleasant temperatures year-round with mist.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.6,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000023-2222-4111-a111-111111111111",
                "userId": "00000023-3333-4111-a111-111111111111",
                "userName": "Siddharth Raj",
                "destinationId": "00000023-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Cycling around Kodaikanal Lake was super relaxing.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000023-4441-4111-a111-111111111111",
                "name": "Kodaikanal Lake",
                "description": "Star-shaped lake at town center.",
                "icon": "water"
            },
            {
                "id": "00000023-4442-4111-a111-111111111111",
                "name": "Coaker's Walk",
                "description": "Paved path with valley panoramas.",
                "icon": "landscape"
            },
            {
                "id": "00000023-4443-4111-a111-111111111111",
                "name": "Pillar Rocks",
                "description": "Three giant vertical rock pillars.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000024-1111-4111-a111-111111111111",
        "name": "Kanyakumari",
        "city": "Kanyakumari",
        "state": "Tamil Nadu",
        "country": "India",
        "description": "The southernmost tip of mainland India, where Arabian Sea, Bay of Bengal, and Indian Ocean meet.",
        "imageUrl": "/images/destinations/kanyakumari.avif",
        "category": "beach",
        "bestTimeToVisit": "October to March",
        "weather": "Tropical ocean climate.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "budget",
        "isFavorite": false,
        "isVisited": false,
        "icon": "beach_access",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000024-2222-4111-a111-111111111111",
                "userId": "00000024-3333-4111-a111-111111111111",
                "userName": "Bhavya Sundaram",
                "destinationId": "00000024-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Viewing sunset over three oceans is unforgettable.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000024-4441-4111-a111-111111111111",
                "name": "Vivekananda Rock Memorial",
                "description": "Island memorial where Swami Vivekananda meditated.",
                "icon": "account_balance"
            },
            {
                "id": "00000024-4442-4111-a111-111111111111",
                "name": "Thiruvalluvar Statue",
                "description": "133-foot stone statue of Tamil poet.",
                "icon": "account_balance"
            },
            {
                "id": "00000024-4443-4111-a111-111111111111",
                "name": "Kanyakumari Beach",
                "description": "Confluence point of three seas.",
                "icon": "beach_access"
            }
        ]
    },
    {
        "id": "00000025-1111-4111-a111-111111111111",
        "name": "Pondicherry",
        "city": "Pondicherry",
        "state": "Puducherry",
        "country": "India",
        "description": "A coastal town blending French colonial architecture, spiritual ashrams, and beaches.",
        "imageUrl": "/images/destinations/pondicherry.avif",
        "category": "beach",
        "bestTimeToVisit": "October to March",
        "weather": "Tropical climate with pleasant winters.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.5,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "beach_access",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000025-2222-4111-a111-111111111111",
                "userId": "00000025-3333-4111-a111-111111111111",
                "userName": "Sophie Laurent",
                "destinationId": "00000025-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "French quarter heritage buildings are so charming.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000025-4441-4111-a111-111111111111",
                "name": "Promenade Beach",
                "description": "Oceanfront rock-paved walkway.",
                "icon": "beach_access"
            },
            {
                "id": "00000025-4442-4111-a111-111111111111",
                "name": "Sri Aurobindo Ashram",
                "description": "Spiritual community center.",
                "icon": "account_balance"
            },
            {
                "id": "00000025-4443-4111-a111-111111111111",
                "name": "Auroville",
                "description": "Experimental township dedicated to human unity.",
                "icon": "park"
            }
        ]
    },
    {
        "id": "00000026-1111-4111-a111-111111111111",
        "name": "Gangtok",
        "city": "Gangtok",
        "state": "Sikkim",
        "country": "India",
        "description": "The capital of Sikkim, nestled in Himalayas, known for monasteries, clean streets, and Kangchenjunga views.",
        "imageUrl": "/images/destinations/gangtok.avif",
        "category": "hill_station",
        "bestTimeToVisit": "September to June",
        "weather": "Cool summers, cold winters.",
        "entryRequirements": "Permit required for Tsomgo Lake / Nathula.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000026-2222-4111-a111-111111111111",
                "userId": "00000026-3333-4111-a111-111111111111",
                "userName": "Mingma Lepcha",
                "destinationId": "00000026-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Tsomgo glacial lake and cable car were amazing.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000026-4441-4111-a111-111111111111",
                "name": "Tsomgo Lake",
                "description": "Glacial high-altitude lake.",
                "icon": "water"
            },
            {
                "id": "00000026-4442-4111-a111-111111111111",
                "name": "Rumtek Monastery",
                "description": "Largest monastery in Sikkim.",
                "icon": "temple_buddhist"
            },
            {
                "id": "00000026-4443-4111-a111-111111111111",
                "name": "Nathula Pass",
                "description": "Mountain pass on Silk Route border.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000027-1111-4111-a111-111111111111",
        "name": "Shillong",
        "city": "Shillong",
        "state": "Meghalaya",
        "country": "India",
        "description": "Known as 'Scotland of the East', famous for rolling hills, pine forests, music culture, and lakes.",
        "imageUrl": "/images/destinations/shillong.avif",
        "category": "hill_station",
        "bestTimeToVisit": "September to May",
        "weather": "Mild climate, rainy monsoons.",
        "entryRequirements": "Valid government-issued photo ID.",
        "averageRating": 4.6,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "landscape",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000027-2222-4111-a111-111111111111",
                "userId": "00000027-3333-4111-a111-111111111111",
                "userName": "Wanbiang Khongjee",
                "destinationId": "00000027-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Umiam lake and pine hill breezes are refreshing.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000027-4441-4111-a111-111111111111",
                "name": "Umiam Lake",
                "description": "Vast reservoir surrounded by hills.",
                "icon": "water"
            },
            {
                "id": "00000027-4442-4111-a111-111111111111",
                "name": "Elephant Falls",
                "description": "Three-tiered mountain waterfall.",
                "icon": "water"
            },
            {
                "id": "00000027-4443-4111-a111-111111111111",
                "name": "Shillong Peak",
                "description": "Highest viewpoint over Shillong city.",
                "icon": "terrain"
            }
        ]
    },
    {
        "id": "00000028-1111-4111-a111-111111111111",
        "name": "Kaziranga National Park",
        "city": "Kanchanjuri",
        "state": "Assam",
        "country": "India",
        "description": "A UNESCO World Heritage sanctuary home to two-thirds of world's one-horned rhinoceroses.",
        "imageUrl": "/images/destinations/kaziranga.avif",
        "category": "nature",
        "bestTimeToVisit": "November to April",
        "weather": "Subtropical climate, flooded in monsoon.",
        "entryRequirements": "Safari entry permit required.",
        "averageRating": 4.7,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "forest",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000028-2222-4111-a111-111111111111",
                "userId": "00000028-3333-4111-a111-111111111111",
                "userName": "Bikash Borah",
                "destinationId": "00000028-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Rhino safari at dawn was breathtaking.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000028-4441-4111-a111-111111111111",
                "name": "Rhinoceros Safari",
                "description": "Jeep and elephant safaris in tall grass.",
                "icon": "forest"
            },
            {
                "id": "00000028-4442-4111-a111-111111111111",
                "name": "Orchid Park",
                "description": "Showcases over 500 wild orchid species.",
                "icon": "park"
            },
            {
                "id": "00000028-4443-4111-a111-111111111111",
                "name": "Brahmaputra Riverfront",
                "description": "Scenic river view stretches.",
                "icon": "water"
            }
        ]
    },
    {
        "id": "00000029-1111-4111-a111-111111111111",
        "name": "Tawang",
        "city": "Tawang",
        "state": "Arunachal Pradesh",
        "country": "India",
        "description": "Perched high in Eastern Himalayas, famous for 400-year-old Tawang Monastery and alpine lakes.",
        "imageUrl": "/images/destinations/tawang.avif",
        "category": "spiritual",
        "bestTimeToVisit": "March to May and September to November",
        "weather": "Cold climate, heavy winter snow.",
        "entryRequirements": "Inner Line Permit (ILP) required.",
        "averageRating": 4.8,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "temple_buddhist",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "00000029-2222-4111-a111-111111111111",
                "userId": "00000029-3333-4111-a111-111111111111",
                "userName": "Dorjee Khandu",
                "destinationId": "00000029-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Tawang Monastery and Sela Pass were peaceful and sacred.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "00000029-4441-4111-a111-111111111111",
                "name": "Tawang Monastery",
                "description": "Largest Buddhist monastery in India.",
                "icon": "account_balance"
            },
            {
                "id": "00000029-4442-4111-a111-111111111111",
                "name": "Sela Pass",
                "description": "Mountain pass at 13,700 feet with frozen lakes.",
                "icon": "terrain"
            },
            {
                "id": "00000029-4443-4111-a111-111111111111",
                "name": "Madhuri Lake",
                "description": "High-altitude lake surrounded by pine mountains.",
                "icon": "water"
            }
        ]
    },
    {
        "id": "0000002a-1111-4111-a111-111111111111",
        "name": "Kohima",
        "city": "Kohima",
        "state": "Nagaland",
        "country": "India",
        "description": "The capital of Nagaland, famous for Hornbill Festival, Naga tribal culture, and Dzukou Valley.",
        "imageUrl": "/images/destinations/kohima.avif",
        "category": "cultural",
        "bestTimeToVisit": "October to May",
        "weather": "Pleasant summers, cool winters.",
        "entryRequirements": "Inner Line Permit (ILP) required.",
        "averageRating": 4.6,
        "budgetCategory": "moderate",
        "isFavorite": false,
        "isVisited": false,
        "icon": "terrain",
        "createdAt": "2026-08-08T11:31:03.000Z",
        "updatedAt": "2026-08-08T11:31:03.000Z",
        "itineraries": [],
        "reviews": [
            {
                "id": "0000002a-2222-4111-a111-111111111111",
                "userId": "0000002a-3333-4111-a111-111111111111",
                "userName": "Kelevo Angami",
                "destinationId": "0000002a-1111-4111-a111-111111111111",
                "rating": 5,
                "review": "Hornbill Festival showcases amazing Naga tribal traditions.",
                "createdAt": "2026-08-08T11:31:03.000Z",
                "updatedAt": "2026-08-08T11:31:03.000Z",
                "isOwner": false
            }
        ],
        "attractions": [
            {
                "id": "0000002a-4441-4111-a111-111111111111",
                "name": "Dzukou Valley",
                "description": "Emerald valley trek famous for lily flowers.",
                "icon": "landscape"
            },
            {
                "id": "0000002a-4442-4111-a111-111111111111",
                "name": "Kisama Heritage Village",
                "description": "Venue for Hornbill Festival.",
                "icon": "museum"
            },
            {
                "id": "0000002a-4443-4111-a111-111111111111",
                "name": "Kohima War Cemetery",
                "description": "Meticulously maintained WWII memorial.",
                "icon": "park"
            }
        ]
    }
];

export default destinations;