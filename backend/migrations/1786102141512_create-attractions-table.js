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
        ('71034b52-40b7-49d9-9a14-c309c47b3be5',
         'Pangong Lake',
         'Famous high-altitude lake with crystal clear blue water.',
         'water'),

        ('71034b52-40b7-49d9-9a14-c309c47b3be5',
         'Nubra Valley',
         'Cold desert known for sand dunes and double-humped camels.',
         'landscape'),

        ('71034b52-40b7-49d9-9a14-c309c47b3be5',
         'Thiksey Monastery',
         'Beautiful Tibetan Buddhist monastery overlooking the valley.',
         'temple_buddhist'),


        -- ANDAMAN
        ('54e0993d-bf74-42d4-8213-551f0414ac2c',
         'Radhanagar Beach',
         'One of Asia''s most beautiful beaches.',
         'beach_access'),

        ('54e0993d-bf74-42d4-8213-551f0414ac2c',
         'Cellular Jail',
         'Historic colonial prison and freedom struggle memorial.',
         'account_balance'),

        ('54e0993d-bf74-42d4-8213-551f0414ac2c',
         'North Bay Island',
         'Popular destination for snorkeling and scuba diving.',
         'scuba_diving'),


        -- MUNNAR
        ('bef5092f-df42-4427-bc7f-b40c5841b7f2',
         'Tea Museum',
         'Explore Kerala''s tea heritage.',
         'emoji_nature'),

        ('bef5092f-df42-4427-bc7f-b40c5841b7f2',
         'Eravikulam National Park',
         'Home of the Nilgiri Tahr.',
         'pets'),

        ('bef5092f-df42-4427-bc7f-b40c5841b7f2',
         'Mattupetty Dam',
         'Scenic reservoir with boating.',
         'water'),


        -- JAIPUR
        ('e492c79b-1320-47bd-87d2-24d86511a046',
         'Amber Fort',
         'Magnificent Rajput fort overlooking Maota Lake.',
         'castle'),

        ('e492c79b-1320-47bd-87d2-24d86511a046',
         'Hawa Mahal',
         'Iconic Palace of Winds.',
         'apartment'),

        ('e492c79b-1320-47bd-87d2-24d86511a046',
         'City Palace',
         'Royal residence with museums and courtyards.',
         'museum'),


        -- AGRA
        ('fd135fa1-9f8b-406e-881f-d6baa8da4498',
         'Taj Mahal',
         'World-famous marble mausoleum.',
         'account_balance'),

        ('fd135fa1-9f8b-406e-881f-d6baa8da4498',
         'Agra Fort',
         'UNESCO World Heritage Mughal fort.',
         'castle'),

        ('fd135fa1-9f8b-406e-881f-d6baa8da4498',
         'Mehtab Bagh',
         'Garden offering stunning Taj Mahal views.',
         'park'),


        -- JIM CORBETT
        ('222f5fd2-04a5-4c1f-8e21-3bb9f98a7302',
         'Dhikala Zone',
         'Most famous safari zone.',
         'pets'),

        ('222f5fd2-04a5-4c1f-8e21-3bb9f98a7302',
         'Garjia Temple',
         'Temple situated on a rock in the river.',
         'temple_hindu'),

        ('222f5fd2-04a5-4c1f-8e21-3bb9f98a7302',
         'Corbett Museum',
         'Museum dedicated to Jim Corbett.',
         'museum'),


        -- VARANASI
        ('76caad7e-a31a-413c-9227-9ea3149aac7f',
         'Dashashwamedh Ghat',
         'Witness the spectacular Ganga Aarti.',
         'self_improvement'),

        ('76caad7e-a31a-413c-9227-9ea3149aac7f',
         'Kashi Vishwanath Temple',
         'One of Hinduism''s holiest temples.',
         'temple_hindu'),

        ('76caad7e-a31a-413c-9227-9ea3149aac7f',
         'Sarnath',
         'Historic Buddhist pilgrimage site.',
         'temple_buddhist'),


        -- GOA
        ('b1d3165b-55de-4ffe-9539-19ebd6fd9cf7',
         'Baga Beach',
         'Popular beach with nightlife.',
         'beach_access'),

        ('b1d3165b-55de-4ffe-9539-19ebd6fd9cf7',
         'Basilica of Bom Jesus',
         'UNESCO-listed historic church.',
         'church'),

        ('b1d3165b-55de-4ffe-9539-19ebd6fd9cf7',
         'Dudhsagar Falls',
         'One of India''s tallest waterfalls.',
         'waterfall_chart');
    `);

}

export async function down(pgm) {

    pgm.dropTable("attractions");

}