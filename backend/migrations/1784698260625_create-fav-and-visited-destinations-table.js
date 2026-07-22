export async function up(pgm) {

    pgm.createTable(
        "favorite_destinations",
        {

            user_id: {
                type: "uuid",
                notNull: true,
                references: "users",
                onDelete: "CASCADE"
            },

            destination_id: {
                type: "uuid",
                notNull: true,
                references: "destinations",
                onDelete: "CASCADE"
            }

        }
    );

    pgm.addConstraint(
        "favorite_destinations",
        "favorite_destinations_pkey",
        {
            primaryKey: [
                "user_id",
                "destination_id"
            ]
        }
    );

    pgm.createTable(
        "visited_destinations",
        {

            user_id: {
                type: "uuid",
                notNull: true,
                references: "users",
                onDelete: "CASCADE"
            },

            destination_id: {
                type: "uuid",
                notNull: true,
                references: "destinations",
                onDelete: "CASCADE"
            }

        }
    );

    pgm.addConstraint(
        "visited_destinations",
        "visited_destinations_pkey",
        {
            primaryKey: [
                "user_id",
                "destination_id"
            ]
        }
    );

}

export async function down(pgm) {

    pgm.dropTable("visited_destinations");

    pgm.dropTable("favorite_destinations");

}