export async function up(pgm) {

    pgm.addColumn(
        "destinations",
        {
            icon: {
                type: "text"
            }
        }
    );

    pgm.sql(`
        UPDATE destinations
        SET icon = CASE name

            WHEN 'Ladakh'
                THEN 'landscape'

            WHEN 'Andaman and Nicobar Islands'
                THEN 'scuba_diving'

            WHEN 'Munnar'
                THEN 'forest'

            WHEN 'Jaipur'
                THEN 'temple_buddhist'

            WHEN 'Agra'
                THEN 'castle'

            WHEN 'Jim Corbett National Park'
                THEN 'pets'

            WHEN 'Varanasi'
                THEN 'self_improvement'

            WHEN 'Goa'
                THEN 'beach_access'

        END;
    `);

    pgm.alterColumn(
        "destinations",
        "icon",
        {
            notNull: true
        }
    );

}

export async function down(pgm) {

    pgm.dropColumn(
        "destinations",
        "icon"
    );

}