export const up = (pgm) => {

    pgm.addColumn(
        "destinations",
        {
            state: {
                type: "text"
            }
        }
    );

    pgm.sql(`
        UPDATE destinations
        SET state =
            CASE

                WHEN name = 'Ladakh'
                    THEN 'Ladakh'

                WHEN name = 'Andaman and Nicobar Islands'
                    THEN 'Andaman and Nicobar Islands'

                WHEN name = 'Munnar'
                    THEN 'Kerala'

                WHEN name = 'Jaipur'
                    THEN 'Rajasthan'

                WHEN name = 'Agra'
                    THEN 'Uttar Pradesh'

                WHEN name = 'Jim Corbett National Park'
                    THEN 'Uttarakhand'

                WHEN name = 'Varanasi'
                    THEN 'Uttar Pradesh'

                WHEN name = 'Goa'
                    THEN 'Goa'

            END;
    `);

    pgm.alterColumn(
        "destinations",
        "state",
        {
            notNull: true
        }
    );

};

export const down = (pgm) => {

    pgm.dropColumn(
        "destinations",
        "state"
    );

};