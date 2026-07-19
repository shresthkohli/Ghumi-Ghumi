export const up = (pgm) => {

    pgm.createTable("reviews", {

        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")
        },

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
        },

        rating: {
            type: "integer",
            notNull: true,
            check: "rating >= 1 AND rating <= 5"
        },

        review: {
            type: "text",
            notNull: true
        },

        created_at: {
            type: "timestamptz",
            default: pgm.func("CURRENT_TIMESTAMP"),
            notNull: true
        },

        updated_at: {
            type: "timestamptz",
            default: pgm.func("CURRENT_TIMESTAMP"),
            notNull: true
        }

    });

    pgm.addConstraint(
        "reviews",
        "unique_review_per_user",
        {
            unique: [
                "user_id",
                "destination_id"
            ]
        }
    );

};

export const down = (pgm) => {

    pgm.dropTable("reviews");

};