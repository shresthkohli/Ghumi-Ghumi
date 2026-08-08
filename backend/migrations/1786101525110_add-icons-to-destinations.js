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
        SET icon = CASE id

            WHEN '71034b52-40b7-49d9-9a14-c309c47b3be5'
                THEN 'landscape'

            WHEN '54e0993d-bf74-42d4-8213-551f0414ac2c'
                THEN 'scuba_diving'

            WHEN 'bef5092f-df42-4427-bc7f-b40c5841b7f2'
                THEN 'forest'

            WHEN 'e492c79b-1320-47bd-87d2-24d86511a046'
                THEN 'temple_buddhist'

            WHEN 'fd135fa1-9f8b-406e-881f-d6baa8da4498'
                THEN 'castle'

            WHEN '222f5fd2-04a5-4c1f-8e21-3bb9f98a7302'
                THEN 'pets'

            WHEN '76caad7e-a31a-413c-9227-9ea3149aac7f'
                THEN 'self_improvement'

            WHEN 'b1d3165b-55de-4ffe-9539-19ebd6fd9cf7'
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