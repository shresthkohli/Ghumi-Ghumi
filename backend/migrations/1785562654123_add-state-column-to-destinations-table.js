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
                WHEN id = '71034b52-40b7-49d9-9a14-c309c47b3be5'
                    THEN 'Ladakh'

                WHEN id = '54e0993d-bf74-42d4-8213-551f0414ac2c'
                    THEN 'Andaman and Nicobar Islands'

                WHEN id = 'bef5092f-df42-4427-bc7f-b40c5841b7f2'
                    THEN 'Kerala'

                WHEN id = 'e492c79b-1320-47bd-87d2-24d86511a046'
                    THEN 'Rajasthan'

                WHEN id = 'fd135fa1-9f8b-406e-881f-d6baa8da4498'
                    THEN 'Uttar Pradesh'

                WHEN id = '222f5fd2-04a5-4c1f-8e21-3bb9f98a7302'
                    THEN 'Uttarakhand'

                WHEN id = '76caad7e-a31a-413c-9227-9ea3149aac7f'
                    THEN 'Uttar Pradesh'

                WHEN id = 'b1d3165b-55de-4ffe-9539-19ebd6fd9cf7'
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