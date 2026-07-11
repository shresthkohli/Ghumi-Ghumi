/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    pgm.createTable("destinations", {

        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")
        },

        name: {
            type: "text",
            notNull: true
        },

        city: {
            type: "text",
            notNull: true
        },

        country: {
            type: "text",
            notNull: true
        },

        description: {
            type: "text",
            notNull: true
        },

        image_url: {
            type: "text",
            notNull: true
        },

        category: {
            type: "text",
            notNull: true
        },

        best_time_to_visit: {
            type: "text",
            notNull: true
        },

        weather: {
            type: "text",
            notNull: true
        },

        entry_requirements: {
            type: "text",
            notNull: true
        },

        average_rating: {
            type: "numeric(2,1)",
            default: 0,
            notNull: true
        },

        budget_category: {
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

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const down = (pgm) => {
    pgm.dropTable("destinations");
};
