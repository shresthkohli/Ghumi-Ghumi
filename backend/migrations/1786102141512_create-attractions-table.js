export async function up(pgm) {

    pgm.createTable(
        "attractions",
        {
            id: {
                type: "uuid",
                primaryKey: true,
                default: pgm.func("gen_random_uuid()")
            },

            destination_id: {
                type: "uuid",
                notNull: true,
                references: "destinations",
                onDelete: "CASCADE"
            },

            name: {
                type: "text",
                notNull: true
            },

            description: {
                type: "text",
                notNull: true
            },

            icon: {
                type: "text",
                notNull: true
            }
        }
    );

    pgm.sql(`
        INSERT INTO attractions
            (destination_id, name, description, icon)
        VALUES

        -- LADAKH
        (
            (SELECT id FROM destinations WHERE name = 'Ladakh'),
            'Pangong Lake',
            'Famous high-altitude lake with crystal clear blue water.',
            'water'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Ladakh'),
            'Nubra Valley',
            'Cold desert known for sand dunes and double-humped camels.',
            'landscape'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Ladakh'),
            'Thiksey Monastery',
            'Beautiful Tibetan Buddhist monastery overlooking the valley.',
            'temple_buddhist'
        ),


        -- ANDAMAN
        (
            (SELECT id FROM destinations WHERE name = 'Andaman and Nicobar Islands'),
            'Radhanagar Beach',
            'One of Asia''s most beautiful beaches.',
            'beach_access'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Andaman and Nicobar Islands'),
            'Cellular Jail',
            'Historic colonial prison and freedom struggle memorial.',
            'account_balance'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Andaman and Nicobar Islands'),
            'North Bay Island',
            'Popular destination for snorkeling and scuba diving.',
            'scuba_diving'
        ),


        -- MUNNAR
        (
            (SELECT id FROM destinations WHERE name = 'Munnar'),
            'Tea Museum',
            'Explore Kerala''s tea heritage.',
            'emoji_nature'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Munnar'),
            'Eravikulam National Park',
            'Home of the Nilgiri Tahr.',
            'pets'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Munnar'),
            'Mattupetty Dam',
            'Scenic reservoir with boating.',
            'water'
        ),


        -- JAIPUR
        (
            (SELECT id FROM destinations WHERE name = 'Jaipur'),
            'Amber Fort',
            'Magnificent Rajput fort overlooking Maota Lake.',
            'castle'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Jaipur'),
            'Hawa Mahal',
            'Iconic Palace of Winds.',
            'apartment'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Jaipur'),
            'City Palace',
            'Royal residence with museums and courtyards.',
            'museum'
        ),


        -- AGRA
        (
            (SELECT id FROM destinations WHERE name = 'Agra'),
            'Taj Mahal',
            'World-famous marble mausoleum.',
            'account_balance'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Agra'),
            'Agra Fort',
            'UNESCO World Heritage Mughal fort.',
            'castle'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Agra'),
            'Mehtab Bagh',
            'Garden offering stunning Taj Mahal views.',
            'park'
        ),


        -- JIM CORBETT
        (
            (SELECT id FROM destinations WHERE name = 'Jim Corbett National Park'),
            'Dhikala Zone',
            'Most famous safari zone.',
            'pets'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Jim Corbett National Park'),
            'Garjia Temple',
            'Temple situated on a rock in the river.',
            'temple_hindu'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Jim Corbett National Park'),
            'Corbett Museum',
            'Museum dedicated to Jim Corbett.',
            'museum'
        ),


        -- VARANASI
        (
            (SELECT id FROM destinations WHERE name = 'Varanasi'),
            'Dashashwamedh Ghat',
            'Witness the spectacular Ganga Aarti.',
            'self_improvement'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Varanasi'),
            'Kashi Vishwanath Temple',
            'One of Hinduism''s holiest temples.',
            'temple_hindu'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Varanasi'),
            'Sarnath',
            'Historic Buddhist pilgrimage site.',
            'temple_buddhist'
        ),


        -- GOA
        (
            (SELECT id FROM destinations WHERE name = 'Goa'),
            'Baga Beach',
            'Popular beach with nightlife.',
            'beach_access'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Goa'),
            'Basilica of Bom Jesus',
            'UNESCO-listed historic church.',
            'church'
        ),

        (
            (SELECT id FROM destinations WHERE name = 'Goa'),
            'Dudhsagar Falls',
            'One of India''s tallest waterfalls.',
            'waterfall_chart'
        );
    `);

}

export async function down(pgm) {

    pgm.dropTable("attractions");

}