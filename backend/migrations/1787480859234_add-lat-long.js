export async function up(pgm) {

    /*
     * ============================================================
     * DESTINATIONS
     * ============================================================
     */

    pgm.addColumns(
        "destinations",
        {
            latitude: {
                type: "double precision"
            },

            longitude: {
                type: "double precision"
            }
        }
    );


    pgm.sql(`
        UPDATE destinations AS d
        SET
            latitude = data.latitude,
            longitude = data.longitude
        FROM (
            VALUES

                ('Jaipur', 26.9124, 75.7873),
                ('Goa', 15.4909, 73.8278),
                ('Munnar', 10.0889, 77.0595),
                ('Varanasi', 25.3176, 82.9739),
                ('Andaman and Nicobar Islands', 11.7401, 92.6586),
                ('Agra', 27.1767, 78.0081),
                ('Jim Corbett National Park', 29.5300, 78.7747),
                ('Ladakh', 34.1526, 77.5771),
                ('Rishikesh', 30.0869, 78.2676),
                ('Lucknow', 26.8467, 80.9462),
                ('Udaipur', 24.5854, 73.7125),
                ('Jaisalmer', 26.9157, 70.9083),
                ('Jodhpur', 26.2389, 73.0243),
                ('Palolem & Dudhsagar', 15.1200, 74.0900),
                ('Aizawl', 23.7271, 92.7176),
                ('Manali', 32.2396, 77.1887),
                ('Shimla', 31.1048, 77.1734),
                ('Alleppey', 9.4981, 76.3388),
                ('Wayanad', 11.6854, 76.1320),
                ('Imphal', 24.8170, 93.9368),
                ('Kurukshetra', 29.9695, 76.8783),
                ('Delhi', 28.6139, 77.2090),
                ('Srinagar', 34.0837, 74.7973),
                ('Rann of Kutch', 23.7337, 69.8597),
                ('Ahmedabad', 23.0225, 72.5714),
                ('Mumbai', 19.0760, 72.8777),
                ('Pune', 18.5204, 73.8567),
                ('Mahabaleshwar', 17.9307, 73.6477),
                ('Bodh Gaya', 24.6961, 84.9911),
                ('Ranchi', 23.3441, 85.3096),
                ('Khajuraho', 24.8318, 79.9199),
                ('Pachmarhi', 22.4676, 78.4346),
                ('Chitrakote Falls', 19.2090, 81.6990),
                ('Kolkata', 22.5726, 88.3639),
                ('Darjeeling', 27.0410, 88.2663),
                ('Agartala', 23.8315, 91.2868),
                ('Puri', 19.8135, 85.8312),
                ('Visakhapatnam', 17.6868, 83.2185),
                ('Hyderabad', 17.3850, 78.4867),
                ('Hampi', 15.3350, 76.4600),
                ('Ooty', 11.4102, 76.6950),
                ('Kodaikanal', 10.2381, 77.4892),
                ('Kanyakumari', 8.0883, 77.5385),
                ('Pondicherry', 11.9416, 79.8083),
                ('Gangtok', 27.3389, 88.6065),
                ('Shillong', 25.5788, 91.8933),
                ('Kaziranga National Park', 26.5775, 93.1711),
                ('Tawang', 27.5861, 91.8650),
                ('Kohima', 25.6751, 94.1086),
                ('Amritsar', 31.6340, 74.8723)

        ) AS data(name, latitude, longitude)

        WHERE d.name = data.name;
    `);


    /*
     * ============================================================
     * ATTRACTIONS
     * ============================================================
     *
     * We identify an attraction using:
     *
     *      destination name + attraction name
     *
     * This is intentional because names such as:
     *
     *      "City Palace"
     *      "Dudhsagar Falls"
     *
     * occur more than once in the dataset.
     */

    pgm.addColumns(
        "attractions",
        {
            latitude: {
                type: "double precision"
            },

            longitude: {
                type: "double precision"
            }
        }
    );


    pgm.sql(`
        UPDATE attractions AS a
        SET
            latitude = data.latitude,
            longitude = data.longitude
        FROM (
            VALUES

                /* ==================================================
                 * LADAKH
                 * ================================================== */

                ('Ladakh', 'Pangong Lake', 33.7595, 78.6670),
                ('Ladakh', 'Nubra Valley', 34.6578, 77.5650),
                ('Ladakh', 'Thiksey Monastery', 34.0578, 77.6690),


                /* ==================================================
                 * ANDAMAN AND NICOBAR
                 * ================================================== */

                ('Andaman and Nicobar Islands', 'Radhanagar Beach', 11.9847, 92.9640),
                ('Andaman and Nicobar Islands', 'Cellular Jail', 11.6698, 92.7525),
                ('Andaman and Nicobar Islands', 'North Bay Island', 11.7037, 92.7160),


                /* ==================================================
                 * MUNNAR
                 * ================================================== */

                ('Munnar', 'Tea Museum', 10.0889, 77.0595),
                ('Munnar', 'Eravikulam National Park', 10.1833, 77.0667),
                ('Munnar', 'Mattupetty Dam', 10.1050, 77.1310),


                /* ==================================================
                 * JAIPUR
                 * ================================================== */

                ('Jaipur', 'Amber Fort', 26.9855, 75.8513),
                ('Jaipur', 'Hawa Mahal', 26.9239, 75.8267),
                ('Jaipur', 'City Palace', 26.9258, 75.8237),


                /* ==================================================
                 * AGRA
                 * ================================================== */

                ('Agra', 'Taj Mahal', 27.1751, 78.0421),
                ('Agra', 'Agra Fort', 27.1795, 78.0211),
                ('Agra', 'Mehtab Bagh', 27.1799, 78.0421),


                /* ==================================================
                 * JIM CORBETT
                 * ================================================== */

                ('Jim Corbett National Park', 'Dhikala Zone', 29.5833, 79.0833),
                ('Jim Corbett National Park', 'Garjia Temple', 29.3715, 79.1170),
                ('Jim Corbett National Park', 'Corbett Museum', 29.3939, 79.1260),


                /* ==================================================
                 * VARANASI
                 * ================================================== */

                ('Varanasi', 'Dashashwamedh Ghat', 25.3067, 83.0107),
                ('Varanasi', 'Kashi Vishwanath Temple', 25.3109, 83.0107),
                ('Varanasi', 'Sarnath', 25.3810, 83.0227),


                /* ==================================================
                 * GOA
                 * ================================================== */

                ('Goa', 'Baga Beach', 15.5557, 73.7517),
                ('Goa', 'Basilica of Bom Jesus', 15.5009, 73.9117),
                ('Goa', 'Dudhsagar Falls', 15.3144, 74.3144),


                /* ==================================================
                 * RISHIKESH
                 * ================================================== */

                ('Rishikesh', 'Laxman Jhula', 30.1269, 78.3222),
                ('Rishikesh', 'Triveni Ghat', 30.1035, 78.2948),
                ('Rishikesh', 'Beatles Ashram', 30.1086, 78.3216),


                /* ==================================================
                 * LUCKNOW
                 * ================================================== */

                ('Lucknow', 'Bara Imambara', 26.8695, 80.9126),
                ('Lucknow', 'Rumi Darwaza', 26.8698, 80.9137),
                ('Lucknow', 'Chota Imambara', 26.8680, 80.9127),


                /* ==================================================
                 * UDAIPUR
                 * ================================================== */

                ('Udaipur', 'City Palace', 24.5764, 73.6835),
                ('Udaipur', 'Lake Pichola', 24.5726, 73.6790),
                ('Udaipur', 'Jag Mandir', 24.5674, 73.6815),


                /* ==================================================
                 * JAISALMER
                 * ================================================== */

                ('Jaisalmer', 'Jaisalmer Fort', 26.9124, 70.9120),
                ('Jaisalmer', 'Sam Sand Dunes', 26.8770, 70.6700),
                ('Jaisalmer', 'Patwon Ki Haveli', 26.9128, 70.9161),


                /* ==================================================
                 * JODHPUR
                 * ================================================== */

                ('Jodhpur', 'Mehrangarh Fort', 26.2988, 73.0180),
                ('Jodhpur', 'Jaswant Thada', 26.2986, 73.0168),
                ('Jodhpur', 'Umaid Bhawan Palace', 26.2800, 73.0475),


                /* ==================================================
                 * PALOLEM & DUDHSAGAR
                 * ================================================== */

                ('Palolem & Dudhsagar', 'Dudhsagar Falls', 15.3144, 74.3144),
                ('Palolem & Dudhsagar', 'Palolem Beach', 15.0099, 74.0232),
                ('Palolem & Dudhsagar', 'Cabo de Rama Fort', 15.0864, 73.9205),


                /* ==================================================
                 * AIZAWL
                 * ================================================== */

                ('Aizawl', 'Reiek Tlang', 23.6840, 92.6020),
                ('Aizawl', 'Solomon''s Temple', 23.7360, 92.7160),
                ('Aizawl', 'Durtlang Hills', 23.7580, 92.7290),


                /* ==================================================
                 * MANALI
                 * ================================================== */

                ('Manali', 'Rohtang Pass', 32.3717, 77.2480),
                ('Manali', 'Solang Valley', 32.3167, 77.1570),
                ('Manali', 'Hadimba Temple', 32.2480, 77.1887),


                /* ==================================================
                 * SHIMLA
                 * ================================================== */

                ('Shimla', 'The Ridge', 31.1048, 77.1734),
                ('Shimla', 'Mall Road', 31.1048, 77.1740),
                ('Shimla', 'Jakhoo Temple', 31.1035, 77.1890),


                /* ==================================================
                 * ALLEPPEY
                 * ================================================== */

                ('Alleppey', 'Kerala Backwaters', 9.4981, 76.3388),
                ('Alleppey', 'Alappuzha Beach', 9.4876, 76.3260),
                ('Alleppey', 'Vembanad Lake', 9.6000, 76.4200),


                /* ==================================================
                 * WAYANAD
                 * ================================================== */

                ('Wayanad', 'Edakkal Caves', 11.6260, 76.2340),
                ('Wayanad', 'Banasura Sagar Dam', 11.7000, 75.9500),
                ('Wayanad', 'Chembra Peak', 11.5190, 76.0960),


                /* ==================================================
                 * IMPHAL
                 * ================================================== */

                ('Imphal', 'Loktak Lake', 24.5500, 93.7800),
                ('Imphal', 'Keibul Lamjao Park', 24.6900, 93.8000),
                ('Imphal', 'Kangla Fort', 24.8070, 93.9360),


                /* ==================================================
                 * KURUKSHETRA
                 * ================================================== */

                ('Kurukshetra', 'Brahma Sarovar', 29.9690, 76.8680),
                ('Kurukshetra', 'Jyotisar', 29.9700, 76.8230),
                ('Kurukshetra', 'Krishna Museum', 29.9620, 76.8360),


                /* ==================================================
                 * DELHI
                 * ================================================== */

                ('Delhi', 'Red Fort', 28.6562, 77.2410),
                ('Delhi', 'Qutub Minar', 28.5245, 77.1855),
                ('Delhi', 'Humayun''s Tomb', 28.5933, 77.2507),


                /* ==================================================
                 * SRINAGAR
                 * ================================================== */

                ('Srinagar', 'Dal Lake', 34.0360, 74.8670),
                ('Srinagar', 'Shalimar Bagh', 34.0910, 74.8700),
                ('Srinagar', 'Shankaracharya Temple', 34.0550, 74.8400),


                /* ==================================================
                 * RANN OF KUTCH
                 * ================================================== */

                ('Rann of Kutch', 'Great Rann of Kutch', 23.8500, 69.8200),
                ('Rann of Kutch', 'Kalo Dungar', 23.8370, 69.5740),
                ('Rann of Kutch', 'Kutch Museum', 23.7337, 69.8597),


                /* ==================================================
                 * AHMEDABAD
                 * ================================================== */

                ('Ahmedabad', 'Sabarmati Ashram', 23.0607, 72.5800),
                ('Ahmedabad', 'Adalaj Stepwell', 23.1660, 72.5800),
                ('Ahmedabad', 'Kankaria Lake', 22.9960, 72.5990),


                /* ==================================================
                 * MUMBAI
                 * ================================================== */

                ('Mumbai', 'Gateway of India', 18.9220, 72.8347),
                ('Mumbai', 'Marine Drive', 18.9430, 72.8238),
                ('Mumbai', 'Elephanta Caves', 18.9633, 72.9315),


                /* ==================================================
                 * PUNE
                 * ================================================== */

                ('Pune', 'Aga Khan Palace', 18.5520, 73.9010),
                ('Pune', 'Shaniwar Wada', 18.5196, 73.8553),
                ('Pune', 'Osho Meditation Resort', 18.5362, 73.8958),


                /* ==================================================
                 * MAHABALESHWAR
                 * ================================================== */

                ('Mahabaleshwar', 'Arthur''s Seat', 17.9200, 73.5750),
                ('Mahabaleshwar', 'Venna Lake', 17.9230, 73.6580),
                ('Mahabaleshwar', 'Pratapgad Fort', 17.9330, 73.5770),


                /* ==================================================
                 * BODH GAYA
                 * ================================================== */

                ('Bodh Gaya', 'Mahabodhi Temple', 24.6961, 84.9911),
                ('Bodh Gaya', 'Great Buddha Statue', 24.6940, 84.9900),
                ('Bodh Gaya', 'Thai Monastery', 24.6930, 84.9870),


                /* ==================================================
                 * RANCHI
                 * ================================================== */

                ('Ranchi', 'Hundru Falls', 23.4490, 85.6620),
                ('Ranchi', 'Jonha Falls', 23.4410, 85.5790),
                ('Ranchi', 'Netarhat', 23.4740, 84.2640),


                /* ==================================================
                 * KHAJURAHO
                 * ================================================== */

                ('Khajuraho', 'Kandariya Mahadeva Temple', 24.8318, 79.9199),
                ('Khajuraho', 'Lakshmana Temple', 24.8520, 79.9210),
                ('Khajuraho', 'Duladeo Temple', 24.8390, 79.9190),


                /* ==================================================
                 * PACHMARHI
                 * ================================================== */

                ('Pachmarhi', 'Bee Fall', 22.4740, 78.4250),
                ('Pachmarhi', 'Jata Shankar Caves', 22.4730, 78.4310),
                ('Pachmarhi', 'Dhoopgarh', 22.4670, 78.4340),


                /* ==================================================
                 * CHITRAKOTE
                 * ================================================== */

                ('Chitrakote Falls', 'Chitrakote Waterfalls', 19.2090, 81.6990),
                ('Chitrakote Falls', 'Kanger Valley Park', 18.7880, 81.8730),
                ('Chitrakote Falls', 'Kotumsar Cave', 18.8350, 81.9000),


                /* ==================================================
                 * KOLKATA
                 * ================================================== */

                ('Kolkata', 'Victoria Memorial', 22.5448, 88.3426),
                ('Kolkata', 'Howrah Bridge', 22.5851, 88.3468),
                ('Kolkata', 'Dakshineswar Kali Temple', 22.6550, 88.3570),


                /* ==================================================
                 * DARJEELING
                 * ================================================== */

                ('Darjeeling', 'Tiger Hill', 27.0100, 88.2530),
                ('Darjeeling', 'Himalayan Railway', 27.0410, 88.2663),
                ('Darjeeling', 'Happy Valley Tea Estate', 27.0510, 88.2570),


                /* ==================================================
                 * AGARTALA
                 * ================================================== */

                ('Agartala', 'Ujjayanta Palace', 23.8360, 91.2790),
                ('Agartala', 'Neermahal', 23.7220, 91.2570),
                ('Agartala', 'Unakoti', 24.3190, 92.0270),


                /* ==================================================
                 * PURI
                 * ================================================== */

                ('Puri', 'Jagannath Temple', 19.8049, 85.8178),
                ('Puri', 'Puri Golden Beach', 19.7980, 85.8245),
                ('Puri', 'Chilika Lake', 19.7000, 85.3200),


                /* ==================================================
                 * VISAKHAPATNAM
                 * ================================================== */

                ('Visakhapatnam', 'INS Kurusura Submarine Museum', 17.7140, 83.3230),
                ('Visakhapatnam', 'Rishikonda Beach', 17.7830, 83.3850),
                ('Visakhapatnam', 'Araku Valley', 18.3273, 82.8770),


                /* ==================================================
                 * HYDERABAD
                 * ================================================== */

                ('Hyderabad', 'Charminar', 17.3616, 78.4747),
                ('Hyderabad', 'Golconda Fort', 17.3833, 78.4011),
                ('Hyderabad', 'Ramoji Film City', 17.2543, 78.6808),


                /* ==================================================
                 * HAMPI
                 * ================================================== */

                ('Hampi', 'Virupaksha Temple', 15.3350, 76.4600),
                ('Hampi', 'Vittala Temple', 15.3140, 76.4770),
                ('Hampi', 'Matanga Hill', 15.3280, 76.4580),


                /* ==================================================
                 * OOTY
                 * ================================================== */

                ('Ooty', 'Botanical Gardens', 11.4160, 76.7110),
                ('Ooty', 'Nilgiri Mountain Railway', 11.4102, 76.6950),
                ('Ooty', 'Ooty Lake', 11.4064, 76.6932),


                /* ==================================================
                 * KODAIKANAL
                 * ================================================== */

                ('Kodaikanal', 'Kodaikanal Lake', 10.2381, 77.4892),
                ('Kodaikanal', 'Coaker''s Walk', 10.2310, 77.4890),
                ('Kodaikanal', 'Pillar Rocks', 10.2140, 77.4740),


                /* ==================================================
                 * KANYAKUMARI
                 * ================================================== */

                ('Kanyakumari', 'Vivekananda Rock Memorial', 8.0780, 77.5560),
                ('Kanyakumari', 'Thiruvalluvar Statue', 8.0770, 77.5520),
                ('Kanyakumari', 'Kanyakumari Beach', 8.0780, 77.5385),


                /* ==================================================
                 * PONDICHERRY
                 * ================================================== */

                ('Pondicherry', 'Promenade Beach', 11.9300, 79.8350),
                ('Pondicherry', 'Sri Aurobindo Ashram', 11.9340, 79.8310),
                ('Pondicherry', 'Auroville', 12.0060, 79.8100),


                /* ==================================================
                 * GANGTOK
                 * ================================================== */

                ('Gangtok', 'Tsomgo Lake', 27.3714, 88.7610),
                ('Gangtok', 'Rumtek Monastery', 27.2930, 88.5610),
                ('Gangtok', 'Nathula Pass', 27.3860, 88.8310),


                /* ==================================================
                 * SHILLONG
                 * ================================================== */

                ('Shillong', 'Umiam Lake', 25.7040, 91.8950),
                ('Shillong', 'Elephant Falls', 25.5370, 91.8600),
                ('Shillong', 'Shillong Peak', 25.5370, 91.8710),


                /* ==================================================
                 * KAZIRANGA
                 * ================================================== */

                ('Kaziranga National Park', 'Rhinoceros Safari', 26.5775, 93.1711),
                ('Kaziranga National Park', 'Orchid Park', 26.5730, 93.1690),
                ('Kaziranga National Park', 'Brahmaputra Riverfront', 26.6500, 93.3000),


                /* ==================================================
                 * TAWANG
                 * ================================================== */

                ('Tawang', 'Tawang Monastery', 27.5861, 91.8650),
                ('Tawang', 'Sela Pass', 27.5050, 92.1160),
                ('Tawang', 'Madhuri Lake', 27.5500, 91.8000),


                /* ==================================================
                 * KOHIMA
                 * ================================================== */

                ('Kohima', 'Dzukou Valley', 25.5490, 94.0980),
                ('Kohima', 'Kisama Heritage Village', 25.6470, 94.1130),
                ('Kohima', 'Kohima War Cemetery', 25.6660, 94.1080),


                /* ==================================================
                 * AMRITSAR
                 * ================================================== */

                ('Amritsar', 'Golden Temple', 31.6200, 74.8765),
                ('Amritsar', 'Jallianwala Bagh', 31.6200, 74.8800),
                ('Amritsar', 'Wagah Border', 31.6040, 74.5740)

        ) AS data(destination_name, attraction_name, latitude, longitude)

        JOIN destinations AS d
            ON d.name = data.destination_name

        WHERE
            a.destination_id = d.id
            AND a.name = data.attraction_name;
    `);


    /*
     * ============================================================
     * CONSTRAINTS
     * ============================================================
     */

    pgm.alterColumn(
        "destinations",
        "latitude",
        {
            notNull: true
        }
    );

    pgm.alterColumn(
        "destinations",
        "longitude",
        {
            notNull: true
        }
    );

    pgm.alterColumn(
        "attractions",
        "latitude",
        {
            notNull: true
        }
    );

    pgm.alterColumn(
        "attractions",
        "longitude",
        {
            notNull: true
        }
    );
}


export async function down(pgm) {

    pgm.dropColumns(
        "destinations",
        [
            "latitude",
            "longitude"
        ]
    );

    pgm.dropColumns(
        "attractions",
        [
            "latitude",
            "longitude"
        ]
    );

}